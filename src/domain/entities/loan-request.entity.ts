import { Applicant } from './applicant.entity';
import { Loan } from './loan.entity';
import { IsEnum, IsNumber, IsPositive, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum LoanRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  UNDER_REVIEW = 'UNDER_REVIEW'
}

export class LoanRequest {
  @IsUUID()
  id: string;

  @IsNumber()
  @IsPositive()
  requestedAmount: number;

  @IsNumber()
  @IsPositive()
  requestedTermMonths: number;

  @IsEnum(LoanRequestStatus)
  status: LoanRequestStatus;

  @ValidateNested()
  @Type(() => Applicant)
  applicant: Applicant;

  @ValidateNested()
  @Type(() => Loan)
  approvedLoan?: Loan;

  @IsNumber()
  @IsPositive()
  creditScore: number;

  @IsNumber()
  @IsPositive()
  monthlyIncome: number;

  @IsNumber()
  @IsPositive()
  monthlyDebt: number;

  constructor(
    id: string,
    requestedAmount: number,
    requestedTermMonths: number,
    applicant: Applicant,
    creditScore: number,
    monthlyIncome: number,
    monthlyDebt: number,
    status: LoanRequestStatus = LoanRequestStatus.PENDING
  ) {
    this.id = id;
    this.requestedAmount = requestedAmount;
    this.requestedTermMonths = requestedTermMonths;
    this.applicant = applicant;
    this.creditScore = creditScore;
    this.monthlyIncome = monthlyIncome;
    this.monthlyDebt = monthlyDebt;
    this.status = status;
  }

  calculateDebtToIncomeRatio(): number {
    return this.monthlyDebt / this.monthlyIncome;
  }

  isEligibleForReview(): boolean {
    return this.creditScore >= 650 &&
           this.calculateDebtToIncomeRatio() <= 0.4 &&
           this.requestedAmount <= 1000000;
  }

  approve(loan: Loan): void {
    if (this.status !== LoanRequestStatus.UNDER_REVIEW) {
      throw new Error('Cannot approve a loan request that is not under review');
    }
    this.approvedLoan = loan;
    this.status = LoanRequestStatus.APPROVED;
  }

  reject(): void {
    if (this.status !== LoanRequestStatus.UNDER_REVIEW) {
      throw new Error('Cannot reject a loan request that is not under review');
    }
    this.status = LoanRequestStatus.REJECTED;
  }

  markForReview(): void {
    if (this.status !== LoanRequestStatus.PENDING) {
      throw new Error('Cannot mark for review a loan request that is not pending');
    }
    this.status = LoanRequestStatus.UNDER_REVIEW;
  }
}