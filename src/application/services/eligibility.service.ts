import { Injectable, Logger } from '@nestjs/common';
import { EligibilityServicePort } from '../../domain/ports/eligibility.service.port';
import { LoanRequest } from '../../domain/entities/loan-request.entity';
import { Applicant } from '../../domain/entities/applicant.entity';

@Injectable()
export class EligibilityService implements EligibilityServicePort {
  private readonly logger = new Logger(EligibilityService.name);
  private static readonly MIN_CREDIT_SCORE = 650;
  private static readonly MAX_DEBT_TO_INCOME_RATIO = 0.43;
  private static readonly MIN_EMPLOYMENT_YEARS = 2;
  private static readonly MIN_LOAN_AMOUNT = 10000;
  private static readonly MAX_LOAN_AMOUNT = 2000000;

  calculateEligibility(loanRequest: LoanRequest, applicant: Applicant): {
    eligible: boolean;
    reasons: string[];
    score: number;
  } {
    this.logger.log(
      `Calculating eligibility for applicant: ${applicant.getFullName()}`,
    );

    const reasons: string[] = [];
    let score = 0;

    const creditScoreCheck = this.validateCreditScore(applicant.creditScore);
    if (!creditScoreCheck.valid) {
      reasons.push(creditScoreCheck.reason);
    } else {
      score += creditScoreCheck.score;
    }

    const employmentCheck = this.validateEmploymentHistory(
      applicant.employmentHistory,
    );
    if (!employmentCheck.valid) {
      reasons.push(employmentCheck.reason);
    } else {
      score += employmentCheck.score;
    }

    const incomeCheck = this.validateIncomeRequirements(
      applicant.annualIncome,
      loanRequest.requestedAmount,
    );
    if (!incomeCheck.valid) {
      reasons.push(incomeCheck.reason);
    } else {
      score += incomeCheck.score;
    }

    const debtToIncomeCheck = this.validateDebtToIncomeRatio(
      loanRequest.calculateDebtToIncomeRatio(),
    );
    if (!debtToIncomeCheck.valid) {
      reasons.push(debtToIncomeCheck.reason);
    } else {
      score += debtToIncomeCheck.score;
    }

    const loanAmountCheck = this.validateLoanAmount(
      loanRequest.requestedAmount,
    );
    if (!loanAmountCheck.valid) {
      reasons.push(loanAmountCheck.reason);
    } else {
      score += loanAmountCheck.score;
    }

    const eligible = reasons.length === 0;
    this.logger.log(
      `Eligibility calculation complete. Eligible: ${eligible}, Score: ${score}, Reasons: ${reasons.length}`,
    );

    return { eligible, reasons, score };
  }

  private validateCreditScore(
    creditScore: number,
  ): { valid: boolean; reason: string; score: number } {
    if (!creditScore || creditScore < EligibilityService.MIN_CREDIT_SCORE) {
      return {
        valid: false,
        reason: `Credit score must be at least ${EligibilityService.MIN_CREDIT_SCORE}`,
        score: 0,
      };
    }

    let score = 20;
    if (creditScore >= 750) score = 30;
    else if (creditScore >= 700) score = 25;

    return { valid: true, reason: '', score };
  }

  private validateEmploymentHistory(
    employmentHistory: { years: number; status: string }[],
  ): { valid: boolean; reason: string; score: number } {
    if (!employmentHistory || employmentHistory.length === 0) {
      return {
        valid: false,
        reason: 'Employment history is required',
        score: 0,
      };
    }

    const totalYears = employmentHistory.reduce(
      (sum, job) => sum + job.years,
      0,
    );

    if (totalYears < EligibilityService.MIN_EMPLOYMENT_YEARS) {
      return {
        valid: false,
        reason: `Minimum ${EligibilityService.MIN_EMPLOYMENT_YEARS} years of employment required`,
        score: 0,
      };
    }

    const hasStableEmployment = employmentHistory.every(
      (job) => job.status === 'active' || job.status === 'permanent',
    );

    let score = 15;
    if (totalYears >= 5 && hasStableEmployment) score = 25;
    else if (totalYears >= 3) score = 20;

    return { valid: true, reason: '', score };
  }

  private validateIncomeRequirements(
    annualIncome: number,
    requestedAmount: number,
  ): { valid: boolean; reason: string; score: number } {
    if (!annualIncome || annualIncome <= 0) {
      return {
        valid: false,
        reason: 'Annual income must be greater than zero',
        score: 0,
      };
    }

    const loanToIncomeRatio = requestedAmount / annualIncome;

    if (loanToIncomeRatio > 5) {
      return {
        valid: false,
        reason: 'Loan amount exceeds 5x annual income',
        score: 0,
      };
    }

    let score = 15;
    if (loanToIncomeRatio <= 2) score = 25;
    else if (loanToIncomeRatio <= 3) score = 20;

    return { valid: true, reason: '', score };
  }

  private validateDebtToIncomeRatio(
    debtToIncomeRatio: number,
  ): { valid: boolean; reason: string; score: number } {
    if (
      debtToIncomeRatio > EligibilityService.MAX_DEBT_TO_INCOME_RATIO
    ) {
      return {
        valid: false,
        reason: `Debt-to-income ratio must not exceed ${EligibilityService.MAX_DEBT_TO_INCOME_RATIO * 100}%`,
        score: 0,
      };
    }

    let score = 15;
    if (debtToIncomeRatio <= 0.28) score = 25;
    else if (debtToIncomeRatio <= 0.36) score = 20;

    return { valid: true, reason: '', score };
  }

  private validateLoanAmount(
    requestedAmount: number,
  ): { valid: boolean; reason: string; score: number } {
    if (requestedAmount < EligibilityService.MIN_LOAN_AMOUNT) {
      return {
        valid: false,
        reason: `Minimum loan amount is ${EligibilityService.MIN_LOAN_AMOUNT}`,
        score: 0,
      };
    }

    if (requestedAmount > EligibilityService.MAX_LOAN_AMOUNT) {
      return {
        valid: false,
        reason: `Maximum loan amount is ${EligibilityService.MAX_LOAN_AMOUNT}`,
        score: 0,
      };
    }

    return { valid: true, reason: '', score: 15 };
  }

  determineApprovalThreshold(score: number): boolean {
    return score >= 70;
  }

  getRiskCategory(score: number): 'low' | 'medium' | 'high' {
    if (score >= 80) return 'low';
    if (score >= 60) return 'medium';
    return 'high';
  }
}