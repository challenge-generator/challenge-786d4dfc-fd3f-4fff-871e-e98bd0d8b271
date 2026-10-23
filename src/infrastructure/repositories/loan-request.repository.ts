import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoanRequestRepositoryPort } from '../../domain/ports/loan-request.repository.port';
import { LoanRequest, LoanRequestStatus } from '../../domain/entities/loan-request.entity';
import { Applicant } from '../../domain/entities/applicant.entity';
import { Loan } from '../../domain/entities/loan.entity';

@Injectable()
export class LoanRequestRepository implements LoanRequestRepositoryPort, OnModuleInit, OnModuleDestroy {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }

  async findAll(): Promise<LoanRequest[]> {
    const records = await this.prisma.loanRequest.findMany({
      include: {
        applicant: true,
        loan: true,
      },
    });
    return records.map(this.mapToEntity);
  }

  async findById(id: string): Promise<LoanRequest | null> {
    const record = await this.prisma.loanRequest.findUnique({
      where: { id },
      include: {
        applicant: true,
        loan: true,
      },
    });
    return record ? this.mapToEntity(record) : null;
  }

  async findByStatus(status: LoanRequestStatus): Promise<LoanRequest[]> {
    const records = await this.prisma.loanRequest.findMany({
      where: { status },
      include: {
        applicant: true,
        loan: true,
      },
    });
    return records.map(this.mapToEntity);
  }

  async findByApplicantId(applicantId: string): Promise<LoanRequest[]> {
    const records = await this.prisma.loanRequest.findMany({
      where: { applicantId },
      include: {
        applicant: true,
        loan: true,
      },
    });
    return records.map(this.mapToEntity);
  }

  async create(data: {
    amount: number;
    termMonths: number;
    purpose: string;
    annualInterestRate: number;
    applicantId: string;
  }): Promise<LoanRequest> {
    const record = await this.prisma.loanRequest.create({
      data: {
        id: this.generateId(),
        amount: data.amount,
        termMonths: data.termMonths,
        purpose: data.purpose,
        annualInterestRate: data.annualInterestRate,
        status: LoanRequestStatus.PENDING,
        applicantId: data.applicantId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        applicant: true,
        loan: true,
      },
    });
    return this.mapToEntity(record);
  }

  async update(id: string, data: Partial<{
    amount: number;
    termMonths: number;
    purpose: string;
    annualInterestRate: number;
    status: LoanRequestStatus;
  }>): Promise<LoanRequest | null> {
    const existing = await this.prisma.loanRequest.findUnique({ where: { id } });
    if (!existing) {
      return null;
    }
    const record = await this.prisma.loanRequest.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: {
        applicant: true,
        loan: true,
      },
    });
    return this.mapToEntity(record);
  }

  async updateStatus(id: string, status: LoanRequestStatus): Promise<LoanRequest | null> {
    return this.update(id, { status });
  }

  async delete(id: string): Promise<boolean> {
    const existing = await this.prisma.loanRequest.findUnique({ where: { id } });
    if (!existing) {
      return false;
    }
    await this.prisma.loanRequest.delete({ where: { id } });
    return true;
  }

  async findPending(): Promise<LoanRequest[]> {
    return this.findByStatus(LoanRequestStatus.PENDING);
  }

  async findApproved(): Promise<LoanRequest[]> {
    return this.findByStatus(LoanRequestStatus.APPROVED);
  }

  async findRejected(): Promise<LoanRequest[]> {
    return this.findByStatus(LoanRequestStatus.REJECTED);
  }

  async countByStatus(status: LoanRequestStatus): Promise<number> {
    return this.prisma.loanRequest.count({ where: { status } });
  }

  private mapToEntity(record: any): LoanRequest {
    const applicant = record.applicant ? new Applicant(
      record.applicant.id,
      record.applicant.firstName,
      record.applicant.lastName,
      record.applicant.email,
      record.applicant.phone,
      record.applicant.taxId,
      record.applicant.annualIncome,
      record.applicant.employmentStatus,
      record.applicant.employmentYears,
    ) : null;

    const loan = record.loan ? new Loan(
      record.loan.id,
      record.loan.principal,
      record.loan.termMonths,
      record.loan.annualInterestRate,
      record.loan.monthlyPayment,
      record.loan.status as any,
      record.loan.startDate,
      record.loan.endDate,
    ) : null;

    return new LoanRequest(
      record.id,
      record.amount,
      record.termMonths,
      record.purpose,
      record.annualInterestRate,
      record.status as LoanRequestStatus,
      applicant,
      loan,
      record.createdAt,
      record.updatedAt,
    );
  }

  private generateId(): string {
    return `LR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}