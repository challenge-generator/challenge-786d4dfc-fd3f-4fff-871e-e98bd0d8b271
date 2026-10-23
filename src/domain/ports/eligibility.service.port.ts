import { Applicant } from '../entities/applicant.entity';
import { LoanRequest } from '../entities/loan-request.entity';

export interface EligibilityResult {
  isEligible: boolean;
  score: number;
  reasons: string[];
  maxLoanAmount: number;
  recommendedInterestRate: number;
}

export interface EligibilityServicePort {
  calculateEligibility(applicant: Applicant, loanRequest: LoanRequest): Promise<EligibilityResult>;
  assessCreditScore(applicant: Applicant): Promise<number>;
  assessDebtToIncomeRatio(applicant: Applicant, loanRequest: LoanRequest): Promise<number>;
  assessEmploymentStability(applicant: Applicant): Promise<number>;
  assessCollateralValue(loanRequest: LoanRequest): Promise<number>;
  determineRiskCategory(score: number): string;
  getRecommendedLoanAmount(assessment: EligibilityResult): number;
  getInterestRateByRisk(riskCategory: string): number;
}