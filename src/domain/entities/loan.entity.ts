import { IsDateString, IsEnum, IsNumber, IsPositive, IsUUID } from 'class-validator';

export enum LoanStatus {
  ACTIVE = 'ACTIVE',
  PAID = 'PAID',
  DEFAULTED = 'DEFAULTED'
}

export class Loan {
  @IsUUID()
  id: string;

  @IsUUID()
  loanRequestId: string;

  @IsNumber()
  @IsPositive()
  approvedAmount: number;

  @IsNumber()
  @IsPositive()
  approvedTermMonths: number;

  @IsNumber()
  @IsPositive()
  interestRate: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsEnum(LoanStatus)
  status: LoanStatus;

  @IsNumber()
  @IsPositive()
  monthlyPayment: number;

  constructor(
    id: string,
    loanRequestId: string,
    approvedAmount: number,
    approvedTermMonths: number,
    interestRate: number,
    startDate: string,
    endDate: string,
    monthlyPayment: number,
    status: LoanStatus = LoanStatus.ACTIVE
  ) {
    this.id = id;
    this.loanRequestId = loanRequestId;
    this.approvedAmount = approvedAmount;
    this.approvedTermMonths = approvedTermMonths;
    this.interestRate = interestRate;
    this.startDate = startDate;
    this.endDate = endDate;
    this.monthlyPayment = monthlyPayment;
    this.status = status;
  }

  calculateTotalInterest(): number {
    return (this.monthlyPayment * this.approvedTermMonths) - this.approvedAmount;
  }

  markAsPaid(): void {
    if (this.status !== LoanStatus.ACTIVE) {
      throw new Error('Cannot mark as paid a loan that is not active');
    }
    this.status = LoanStatus.PAID;
  }

  markAsDefaulted(): void {
    if (this.status !== LoanStatus.ACTIVE) {
      throw new Error('Cannot mark as defaulted a loan that is not active');
    }
    this.status = LoanStatus.DEFAULTED;
  }

  getRemainingBalance(currentDate: string): number {
    const start = new Date(this.startDate);
    const current = new Date(currentDate);
    const monthsPassed = (current.getFullYear() - start.getFullYear()) * 12 +
                         (current.getMonth() - start.getMonth());

    if (monthsPassed >= this.approvedTermMonths) {
      return 0;
    }

    const remainingMonths = this.approvedTermMonths - monthsPassed;
    return this.monthlyPayment * remainingMonths;
  }
}