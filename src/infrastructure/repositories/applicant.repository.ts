import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ApplicantRepositoryPort } from '../../domain/ports/applicant.repository.port';
import { Applicant } from '../../domain/entities/applicant.entity';

@Injectable()
export class ApplicantRepository implements ApplicantRepositoryPort, OnModuleInit, OnModuleDestroy {
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

  async findAll(): Promise<Applicant[]> {
    const records = await this.prisma.applicant.findMany();
    return records.map(this.mapToEntity);
  }

  async findById(id: string): Promise<Applicant | null> {
    const record = await this.prisma.applicant.findUnique({
      where: { id },
    });
    return record ? this.mapToEntity(record) : null;
  }

  async findByEmail(email: string): Promise<Applicant | null> {
    const record = await this.prisma.applicant.findUnique({
      where: { email },
    });
    return record ? this.mapToEntity(record) : null;
  }

  async findByTaxId(taxId: string): Promise<Applicant | null> {
    const record = await this.prisma.applicant.findFirst({
      where: { taxId },
    });
    return record ? this.mapToEntity(record) : null;
  }

  async create(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    taxId: string;
    annualIncome: number;
    employmentStatus: string;
    employmentYears: number;
  }): Promise<Applicant> {
    const record = await this.prisma.applicant.create({
      data: {
        id: this.generateId(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        taxId: data.taxId,
        annualIncome: data.annualIncome,
        employmentStatus: data.employmentStatus,
        employmentYears: data.employmentYears,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return this.mapToEntity(record);
  }

  async update(id: string, data: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    taxId: string;
    annualIncome: number;
    employmentStatus: string;
    employmentYears: number;
  }>): Promise<Applicant | null> {
    const existing = await this.prisma.applicant.findUnique({ where: { id } });
    if (!existing) {
      return null;
    }
    const record = await this.prisma.applicant.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    return this.mapToEntity(record);
  }

  async delete(id: string): Promise<boolean> {
    const existing = await this.prisma.applicant.findUnique({ where: { id } });
    if (!existing) {
      return false;
    }
    await this.prisma.applicant.delete({ where: { id } });
    return true;
  }

  async findByEmploymentStatus(status: string): Promise<Applicant[]> {
    const records = await this.prisma.applicant.findMany({
      where: { employmentStatus: status },
    });
    return records.map(this.mapToEntity);
  }

  async findByIncomeRange(minIncome: number, maxIncome: number): Promise<Applicant[]> {
    const records = await this.prisma.applicant.findMany({
      where: {
        annualIncome: {
          gte: minIncome,
          lte: maxIncome,
        },
      },
    });
    return records.map(this.mapToEntity);
  }

  async countByEmploymentStatus(status: string): Promise<number> {
    return this.prisma.applicant.count({ where: { employmentStatus: status } });
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.prisma.applicant.count({ where: { email } });
    return count > 0;
  }

  async existsByTaxId(taxId: string): Promise<boolean> {
    const count = await this.prisma.applicant.count({ where: { taxId } });
    return count > 0;
  }

  private mapToEntity(record: any): Applicant {
    return new Applicant(
      record.id,
      record.firstName,
      record.lastName,
      record.email,
      record.phone,
      record.taxId,
      record.annualIncome,
      record.employmentStatus,
      record.employmentYears,
    );
  }

  private generateId(): string {
    return `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}