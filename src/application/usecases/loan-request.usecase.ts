import { Injectable, Logger, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { LoanRequestRepositoryPort } from '../../domain/ports/loan-request.repository.port';
import { ApplicantRepositoryPort } from '../../domain/ports/applicant.repository.port';
import { EligibilityService } from '../services/eligibility.service';
import { LoanRequest, LoanRequestStatus } from '../../domain/entities/loan-request.entity';
import { Loan } from '../../domain/entities/loan.entity';
import { LoanRequestCreatedEvent } from '../../domain/events/loan-request-created.event';

export interface CreateLoanRequestInput {
  applicantId: string;
  requestedAmount: number;
  termMonths: number;
  propertyAddress: string;
  propertyValue: number;
  purpose: 'purchase' | 'refinance' | 'construction';
}

export interface LoanRequestResult {
  loanRequest: LoanRequest;
  eligibilityResult: {
    eligible: boolean;
    reasons: string[];
    score: number;
  };
}

@Injectable()
export class LoanRequestUseCase {
  private readonly logger = new Logger(LoanRequestUseCase.name);

  constructor(
    private readonly loanRequestRepository: LoanRequestRepositoryPort,
    private readonly applicantRepository: ApplicantRepositoryPort,
    private readonly eligibilityService: EligibilityService,
  ) {}

  async createLoanRequest(input: CreateLoanRequestInput): Promise<LoanRequestResult> {
    this.logger.log(`Creating loan request for applicant: ${input.applicantId}`);

    const applicant = await this.applicantRepository.findById(input.applicantId);
    if (!applicant) {
      throw new NotFoundException(`Applicant with ID ${input.applicantId} not found`);
    }

    if (!applicant.validateTaxId()) {
      throw new BadRequestException('Applicant tax ID is invalid');
    }

    const existingRequest = await this.loanRequestRepository.findPendingByApplicant(input.applicantId);
    if (existingRequest) {
      throw new ConflictException('Applicant already has a pending loan request');
    }

    const loanRequest = new LoanRequest({
      applicantId: input.applicantId,
      requestedAmount: input.requestedAmount,
      termMonths: input.termMonths,
      propertyAddress: input.propertyAddress,
      propertyValue: input.propertyValue,
      purpose: input.purpose,
      status: LoanRequestStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (!loanRequest.isEligibleForReview()) {
      throw new BadRequestException('Loan request does not meet minimum criteria for review');
    }

    const eligibilityResult = this.eligibilityService.calculateEligibility(loanRequest, applicant);

    const savedRequest = await this.loanRequestRepository.save(loanRequest);
    this.logger.log(`Loan request created with ID: ${savedRequest.id}`);

    return {
      loanRequest: savedRequest,
      eligibilityResult,
    };
  }

  async approveLoanRequest(requestId: string, approvedAmount: number, interestRate: number): Promise<Loan> {
    this.logger.log(`Approving loan request: ${requestId}`);

    const loanRequest = await this.loanRequestRepository.findById(requestId);
    if (!loanRequest) {
      throw new NotFoundException(`Loan request with ID ${requestId} not found`);
    }

    if (loanRequest.status !== LoanRequestStatus.PENDING) {
      throw new BadRequestException('Loan request is not in pending status');
    }

    const applicant = await this.applicantRepository.findById(loanRequest.applicantId);
    if (!applicant) {
      throw new NotFoundException('Applicant not found for this loan request');
    }

    const eligibilityResult = this.eligibilityService.calculateEligibility(loanRequest, applicant);
    
    if (!eligibilityResult.eligible) {
      throw new BadRequestException(`Applicant not eligible: ${eligibilityResult.reasons.join(', ')}`);
    }

    if (!this.eligibilityService.determineApprovalThreshold(eligibilityResult.score)) {
      throw new BadRequestException('Eligibility score does not meet approval threshold');
    }

    const loan = new Loan({
      loanRequestId: requestId,
      applicantId: loanRequest.applicantId,
      principalAmount: approvedAmount,
      interestRate: interestRate,
      termMonths: loanRequest.termMonths,
      monthlyPayment: this.calculateMonthlyPayment(approvedAmount, interestRate, loanRequest.termMonths),
      startDate: new Date().toISOString(),
      status: 'active',
    });

    loanRequest.approve(loan);
    await this.loanRequestRepository.update(loanRequest);

    this.logger.log(`Loan request ${requestId} approved. Loan ID: ${loan.id}`);
    return loan;
  }

  async rejectLoanRequest(requestId: string, rejectionReason: string): Promise<LoanRequest> {
    this.logger.log(`Rejecting loan request: ${requestId}`);

    const loanRequest = await this.loanRequestRepository.findById(requestId);
    if (!loanRequest) {
      throw new NotFoundException(`Loan request with ID ${requestId} not found`);
    }

    if (loanRequest.status !== LoanRequestStatus.PENDING) {
      throw new BadRequestException('Loan request is not in pending status');
    }

    loanRequest.reject();
    await this.loanRequestRepository.update(loanRequest);

    this.logger.log(`Loan request ${requestId} rejected. Reason: ${rejectionReason}`);
    return loanRequest;
  }

  async getLoanRequestById(requestId: string): Promise<LoanRequest> {
    const loanRequest = await this.loanRequestRepository.findById(requestId);
    if (!loanRequest) {
      throw new NotFoundException(`Loan request with ID ${requestId} not found`);
    }
    return loanRequest;
  }

  async getLoanRequestsByApplicant(applicantId: string): Promise<LoanRequest[]> {
    return this.loanRequestRepository.findByApplicantId(applicantId);
  }

  async getAllPendingRequests(): Promise<LoanRequest[]> {
    return this.loanRequestRepository.findByStatus(LoanRequestStatus.PENDING);
  }

  async markForManualReview(requestId: string): Promise<LoanRequest> {
    this.logger.log(`Marking loan request for manual review: ${requestId}`);

    const loanRequest = await this.loanRequestRepository.findById(requestId);
    if (!loanRequest) {
      throw new NotFoundException(`Loan request with ID ${requestId} not found`);
    }

    loanRequest.markForReview();
    await this.loanRequestRepository.update(loanRequest);

    return loanRequest;
  }

  private calculateMonthlyPayment(
    principal: number,
    annualInterestRate: number,
    termMonths: number,
  ): number {
    const monthlyRate = annualInterestRate / 100 / 12;
    const payment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);
    return Math.round(payment * 100) / 100;
  }

  async processLoanRequestAutomation(requestId: string): Promise<{ approved: boolean; loan?: Loan }> {
    this.logger.log(`Processing automated decision for loan request: ${requestId}`);

    const loanRequest = await this.getLoanRequestById(requestId);
    const applicant = await this.applicantRepository.findById(loanRequest.applicantId);

    if (!applicant) {
      throw new NotFoundException('Applicant not found');
    }

    const eligibilityResult = this.eligibilityService.calculateEligibility(loanRequest, applicant);

    if (eligibilityResult.eligible && this.eligibilityService.determineApprovalThreshold(eligibilityResult.score)) {
      const riskCategory = this.eligibilityService.getRiskCategory(eligibilityResult.score);
      const interestRate = this.getInterestRateByRisk(riskCategory);

      const loan = await this.approveLoanRequest(
        requestId,
        loanRequest.requestedAmount,
        interestRate,
      );

      return { approved: true, loan };
    }

    if (eligibilityResult.score >= 50 && eligibilityResult.score < 70) {
      await this.markForManualReview(requestId);
    } else {
      await this.rejectLoanRequest(
        requestId,
        eligibilityResult.reasons.join('; ') || 'Does not meet eligibility criteria',
      );
    }

    return { approved: false };
  }

  private getInterestRateByRisk(riskCategory: 'low' | 'medium' | 'high'): number {
    const rates = {
      low: 4.5,
      medium: 6.0,
      high: 8.5,
    };
    return rates[riskCategory];
  }
}