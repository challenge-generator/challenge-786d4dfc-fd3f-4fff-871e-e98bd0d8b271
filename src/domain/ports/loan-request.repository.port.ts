import { LoanRequest } from '../entities/loan-request.entity';

export interface LoanRequestRepositoryPort {
  findById(id: string): Promise<LoanRequest | null>;
  findAll(): Promise<LoanRequest[]>;
  findByStatus(status: string): Promise<LoanRequest[]>;
  findByApplicantId(applicantId: string): Promise<LoanRequest[]>;
  save(loanRequest: LoanRequest): Promise<LoanRequest>;
  update(id: string, loanRequest: Partial<LoanRequest>): Promise<LoanRequest>;
  delete(id: string): Promise<void>;
  existsById(id: string): Promise<boolean>;
  countByStatus(status: string): Promise<number>;
}