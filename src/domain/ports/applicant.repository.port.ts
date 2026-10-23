import { Applicant } from '../entities/applicant.entity';

export interface ApplicantRepositoryPort {
  findById(id: string): Promise<Applicant | null>;
  findAll(): Promise<Applicant[]>;
  findByTaxId(taxId: string): Promise<Applicant | null>;
  findByEmail(email: string): Promise<Applicant | null>;
  save(applicant: Applicant): Promise<Applicant>;
  update(id: string, applicant: Partial<Applicant>): Promise<Applicant>;
  delete(id: string): Promise<void>;
  existsById(id: string): Promise<boolean>;
  existsByTaxId(taxId: string): Promise<boolean>;
}