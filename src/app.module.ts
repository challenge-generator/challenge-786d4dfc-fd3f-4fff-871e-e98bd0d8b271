import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseConfig } from './infrastructure/config/database.config';
import { LoanRequestRepository } from './infrastructure/repositories/loan-request.repository';
import { ApplicantRepository } from './infrastructure/repositories/applicant.repository';
import { EligibilityService } from './application/services/eligibility.service';
import { LoanRequestUseCase } from './application/usecases/loan-request.usecase';
import { LoanRequestController } from './infrastructure/controllers/loan-request.controller';
import { HttpExceptionFilter } from './infrastructure/filters/http-exception.filter';

@Module({
  imports: [],
  controllers: [LoanRequestController],
  providers: [
    DatabaseConfig,
    {
      provide: 'LoanRequestRepositoryPort',
      useClass: LoanRequestRepository,
    },
    {
      provide: 'ApplicantRepositoryPort',
      useClass: ApplicantRepository,
    },
    {
      provide: 'EligibilityServicePort',
      useClass: EligibilityService,
    },
    LoanRequestUseCase,
    EligibilityService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [DatabaseConfig, 'LoanRequestRepositoryPort', 'ApplicantRepositoryPort', 'EligibilityServicePort'],
})
export class AppModule {}