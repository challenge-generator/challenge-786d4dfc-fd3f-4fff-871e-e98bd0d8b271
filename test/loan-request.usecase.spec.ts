import { Test, TestingModule } from '@nestjs/testing';
import { LoanRequestUseCase } from '../src/application/usecases/loan-request.usecase';
import { LoanRequestRepositoryPort } from '../src/domain/ports/loan-request.repository.port';
import { EligibilityServicePort } from '../src/domain/ports/eligibility.service.port';
import { LoanRequest, LoanRequestStatus } from '../src/domain/entities/loan-request.entity';
import { Applicant } from '../src/domain/entities/applicant.entity';
import { Loan } from '../src/domain/entities/loan.entity';

describe('LoanRequestUseCase', () => {
  let useCase: LoanRequestUseCase;
  let loanRequestRepository: jest.Mocked<LoanRequestRepositoryPort>;
  let eligibilityService: jest.Mocked<EligibilityServicePort>;

  const mockApplicant: Applicant = {
    id: 'app-123',
    firstName: 'Juan',
    lastName: 'Pérez',
    taxId: '12345678A',
    email: 'juan.perez@example.com',
    annualIncome: 60000,
    employmentType: 'FULL_TIME' as const,
    yearsInEmployment: 3,
    getFullName: function(): string {
      return `${this.firstName} ${this.lastName}`;
    },
    validateTaxId: function(): boolean {
      const taxIdRegex = /^[0-9]{8}[A-Z]$/;
      return taxIdRegex.test(this.taxId);
    }
  };

  const mockLoanRequest: LoanRequest = {
    id: 'lr-456',
    applicant: mockApplicant,
    requestedAmount: 200000,
    requestedTermMonths: 240,
    propertyValue: 300000,
    status: LoanRequestStatus.PENDING,
    submissionDate: new Date('2024-01-15'),
    lastUpdated: new Date('2024-01-15'),
    calculateDebtToIncomeRatio: function(): number {
      const monthlyIncome = this.applicant.annualIncome / 12;
      const monthlyPayment = this.requestedAmount / this.requestedTermMonths;
      return monthlyPayment / monthlyIncome;
    },
    isEligibleForReview: function(): boolean {
      const dti = this.calculateDebtToIncomeRatio();
      const ltv = this.requestedAmount / this.propertyValue;
      return dti <= 0.36 && ltv <= 0.8 && this.status === LoanRequestStatus.PENDING;
    },
    approve: function(loan: Loan): void {
      this.status = LoanRequestStatus.APPROVED;
      this.lastUpdated = new Date();
    },
    reject: function(): void {
      this.status = LoanRequestStatus.REJECTED;
      this.lastUpdated = new Date();
    },
    markForReview: function(): void {
      this.status = LoanRequestStatus.UNDER_REVIEW;
      this.lastUpdated = new Date();
    }
  };

  const mockLoan: Loan = {
    id: 'loan-789',
    loanRequestId: 'lr-456',
    principal: 200000,
    interestRate: 0.05,
    termMonths: 240,
    monthlyPayment: 1319.91,
    startDate: new Date('2024-02-01'),
    status: 'ACTIVE' as any,
    calculateTotalInterest: function(): number {
      return (this.monthlyPayment * this.termMonths) - this.principal;
    },
    markAsPaid: function(): void {
      this.status = 'PAID' as any;
    },
    markAsDefaulted: function(): void {
      this.status = 'DEFAULTED' as any;
    },
    getRemainingBalance: function(currentDate: string): number {
      const start = this.startDate.getTime();
      const current = new Date(currentDate).getTime();
      const monthsElapsed = Math.floor((current - start) / (30 * 24 * 60 * 60 * 1000));
      const totalPayments = this.termMonths;
      const paymentsMade = Math.min(monthsElapsed, totalPayments);
      return Math.max(0, this.principal - (this.monthlyPayment * paymentsMade));
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanRequestUseCase,
        {
          provide: 'LoanRequestRepositoryPort',
          useValue: {
            save: jest.fn(),
            findById: jest.fn(),
            findByApplicantId: jest.fn(),
            update: jest.fn()
          }
        },
        {
          provide: 'EligibilityServicePort',
          useValue: {
            calculateEligibility: jest.fn(),
            assessRisk: jest.fn()
          }
        }
      ]
    }).compile();

    useCase = module.get<LoanRequestUseCase>(LoanRequestUseCase);
    loanRequestRepository = module.get('LoanRequestRepositoryPort');
    eligibilityService = module.get('EligibilityServicePort');
  });

  it('debe estar definido', () => {
    expect(useCase).toBeDefined();
  });

  describe('createLoanRequest', () => {
    it('debe crear una solicitud de préstamo cuando el solicitante es elegible', async () => {
      const createDto = {
        applicantId: 'app-123',
        requestedAmount: 200000,
        requestedTermMonths: 240,
        propertyValue: 300000
      };

      eligibilityService.calculateEligibility.mockResolvedValue({
        eligible: true,
        score: 85,
        maxAmount: 250000,
        recommendedRate: 0.045
      });

      loanRequestRepository.save.mockResolvedValue(mockLoanRequest);

      const result = await useCase.createLoanRequest(createDto);

      expect(eligibilityService.calculateEligibility).toHaveBeenCalledWith(
        expect.objectContaining({
          requestedAmount: createDto.requestedAmount,
          propertyValue: createDto.propertyValue
        })
      );
      expect(loanRequestRepository.save).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('debe rechazar la solicitud cuando el solicitante no es elegible', async () => {
      const createDto = {
        applicantId: 'app-123',
        requestedAmount: 350000,
        requestedTermMonths: 240,
        propertyValue: 300000
      };

      eligibilityService.calculateEligibility.mockResolvedValue({
        eligible: false,
        score: 40,
        maxAmount: 200000,
        recommendedRate: 0.065
      });

      await expect(useCase.createLoanRequest(createDto)).rejects.toThrow(
        'El solicitante no cumple con los requisitos de elegibilidad'
      );
    });

    it('debe validar que el monto solicitado no exceda el valor de la propiedad', async () => {
      const createDto = {
        applicantId: 'app-123',
        requestedAmount: 350000,
        requestedTermMonths: 180,
        propertyValue: 300000
      };

      await expect(useCase.createLoanRequest(createDto)).rejects.toThrow(
        'El monto solicitado no puede exceder el valor de la propiedad'
      );
    });
  });

  describe('approveLoanRequest', () => {
    it('debe aprobar una solicitud de préstamo elegible', async () => {
      const approveDto = {
        loanRequestId: 'lr-456',
        interestRate: 0.05,
        termMonths: 240
      };

      loanRequestRepository.findById.mockResolvedValue(mockLoanRequest);
      loanRequestRepository.update.mockResolvedValue({
        ...mockLoanRequest,
        status: LoanRequestStatus.APPROVED
      });

      const result = await useCase.approveLoanRequest(approveDto);

      expect(mockLoanRequest.isEligibleForReview()).toBe(true);
      expect(loanRequestRepository.update).toHaveBeenCalled();
      expect(result.status).toBe(LoanRequestStatus.APPROVED);
    });

    it('debe rechazar la aprobación de una solicitud no elegible', async () => {
      const nonEligibleRequest: LoanRequest = {
        ...mockLoanRequest,
        status: LoanRequestStatus.PENDING,
        calculateDebtToIncomeRatio: () => 0.45,
        isEligibleForReview: () => false,
        approve: function(loan: Loan): void {},
        reject: function(): void {},
        markForReview: function(): void {}
      };

      const approveDto = {
        loanRequestId: 'lr-456',
        interestRate: 0.05,
        termMonths: 240
      };

      loanRequestRepository.findById.mockResolvedValue(nonEligibleRequest);

      await expect(useCase.approveLoanRequest(approveDto)).rejects.toThrow(
        'La solicitud no cumple con los requisitos para aprobación'
      );
    });
  });

  describe('rejectLoanRequest', () => {
    it('debe rechazar una solicitud de préstamo', async () => {
      const rejectDto = {
        loanRequestId: 'lr-456',
        reason: 'No cumple con los requisitos de income'
      };

      loanRequestRepository.findById.mockResolvedValue(mockLoanRequest);
      loanRequestRepository.update.mockResolvedValue({
        ...mockLoanRequest,
        status: LoanRequestStatus.REJECTED
      });

      const result = await useCase.rejectLoanRequest(rejectDto);

      expect(loanRequestRepository.update).toHaveBeenCalled();
      expect(result.status).toBe(LoanRequestStatus.REJECTED);
    });
  });

  describe('getLoanRequestById', () => {
    it('debe retornar la solicitud de préstamo por su ID', async () => {
      loanRequestRepository.findById.mockResolvedValue(mockLoanRequest);

      const result = await useCase.getLoanRequestById('lr-456');

      expect(loanRequestRepository.findById).toHaveBeenCalledWith('lr-456');
      expect(result).toEqual(mockLoanRequest);
    });

    it('debe lanzar excepción cuando la solicitud no existe', async () => {
      loanRequestRepository.findById.mockResolvedValue(null);

      await expect(useCase.getLoanRequestById('non-existent')).rejects.toThrow(
        'Solicitud de préstamo no encontrada'
      );
    });
  });

  describe('getLoanRequestsByApplicant', () => {
    it('debe retornar todas las solicitudes de un solicitante', async () => {
      const requests = [mockLoanRequest];
      loanRequestRepository.findByApplicantId.mockResolvedValue(requests);

      const result = await useCase.getLoanRequestsByApplicant('app-123');

      expect(loanRequestRepository.findByApplicantId).toHaveBeenCalledWith('app-123');
      expect(result).toEqual(requests);
    });
  });
});