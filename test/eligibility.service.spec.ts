import { Test, TestingModule } from '@nestjs/testing';
import { EligibilityService } from '../src/application/services/eligibility.service';
import { Applicant } from '../src/domain/entities/applicant.entity';

describe('EligibilityService', () => {
  let service: EligibilityService;

  const createMockApplicant = (overrides: Partial<Applicant> = {}): Applicant => ({
    id: 'app-test-123',
    firstName: 'María',
    lastName: 'García',
    taxId: '12345678B',
    email: 'maria.garcia@example.com',
    annualIncome: 72000,
    employmentType: 'FULL_TIME' as const,
    yearsInEmployment: 5,
    getFullName: function(): string {
      return `${this.firstName} ${this.lastName}`;
    },
    validateTaxId: function(): boolean {
      const taxIdRegex = /^[0-9]{8}[A-Z]$/;
      return taxIdRegex.test(this.taxId);
    },
    ...overrides
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EligibilityService]
    }).compile();

    service = module.get<EligibilityService>(EligibilityService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('calculateEligibility', () => {
    it('debe calcular elegibilidad para un solicitante con buen perfil', async () => {
      const applicant = createMockApplicant({ annualIncome: 80000 });
      const eligibilityData = {
        applicant,
        requestedAmount: 200000,
        propertyValue: 300000,
        requestedTermMonths: 240
      };

      const result = await service.calculateEligibility(eligibilityData);

      expect(result.eligible).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(70);
      expect(result.maxAmount).toBeGreaterThan(0);
    });

    it('debe rechazar solicitante con ratio DTI muy alto', async () => {
      const applicant = createMockApplicant({ annualIncome: 30000 });
      const eligibilityData = {
        applicant,
        requestedAmount: 250000,
        propertyValue: 280000,
        requestedTermMonths: 300
      };

      const result = await service.calculateEligibility(eligibilityData);

      expect(result.eligible).toBe(false);
      expect(result.reasons).toContain('Ratio de deuda a ingresos demasiado alto');
    });

    it('debe rechazar cuando el LTV excede el 80%', async () => {
      const applicant = createMockApplicant({ annualIncome: 100000 });
      const eligibilityData = {
        applicant,
        requestedAmount: 270000,
        propertyValue: 300000,
        requestedTermMonths: 240
      };

      const result = await service.calculateEligibility(eligibilityData);

      expect(result.eligible).toBe(false);
      expect(result.reasons).toContain('Ratio préstamo a valor excede el límite permitido');
    });

    it('debe evaluar la estabilidad laboral', async () => {
      const unstableApplicant = createMockApplicant({ 
        annualIncome: 80000,
        yearsInEmployment: 1,
        employmentType: 'CONTRACT' as const
      });
      const eligibilityData = {
        applicant: unstableApplicant,
        requestedAmount: 180000,
        propertyValue: 300000,
        requestedTermMonths: 240
      };

      const result = await service.calculateEligibility(eligibilityData);

      expect(result.score).toBeLessThan(85);
    });

    it('debe calcular el monto máximo basado en ingresos', async () => {
      const applicant = createMockApplicant({ annualIncome: 60000 });
      const eligibilityData = {
        applicant,
        requestedAmount: 200000,
        propertyValue: 350000,
        requestedTermMonths: 240
      };

      const result = await service.calculateEligibility(eligibilityData);

      expect(result.maxAmount).toBeGreaterThan(0);
      expect(result.maxAmount).toBeLessThanOrEqual(250000);
    });

    it('debe aplicar patrón Experto en Información correctamente', async () => {
      const applicant = createMockApplicant({ annualIncome: 90000 });
      const eligibilityData = {
        applicant,
        requestedAmount: 150000,
        propertyValue: 250000,
        requestedTermMonths: 180
      };

      const result = await service.calculateEligibility(eligibilityData);

      expect(result.eligible).toBe(true);
      expect(result.recommendedRate).toBeLessThanOrEqual(0.055);
    });
  });

  describe('assessRisk', () => {
    it('debe evaluar riesgo bajo para solicitante con buen historial', async () => {
      const applicant = createMockApplicant({
        annualIncome: 85000,
        yearsInEmployment: 7,
        employmentType: 'FULL_TIME' as const
      });

      const result = await service.assessRisk(applicant, 180000, 300000);

      expect(result.riskLevel).toBe('LOW');
      expect(result.riskScore).toBeLessThan(30);
    });

    it('debe evaluar riesgo alto para solicitante con ingresos variables', async () => {
      const applicant = createMockApplicant({
        annualIncome: 50000,
        yearsInEmployment: 2,
        employmentType: 'SELF_EMPLOYED' as const
      });

      const result = await service.assessRisk(applicant, 250000, 280000);

      expect(result.riskLevel).toBe('HIGH');
      expect(result.riskScore).toBeGreaterThanOrEqual(60);
    });

    it('debe considerar el monto solicitado en la evaluación de riesgo', async () => {
      const applicant = createMockApplicant({ annualIncome: 60000 });

      const lowAmount = await service.assessRisk(applicant, 100000, 250000);
      const highAmount = await service.assessRisk(applicant, 240000, 250000);

      expect(highAmount.riskScore).toBeGreaterThan(lowAmount.riskScore);
    });

    it('debe aplicar patrón Alta Cohesión en el cálculo de riesgo', async () => {
      const applicant = createMockApplicant({ annualIncome: 75000 });

      const result = await service.assessRisk(applicant, 160000, 300000);

      expect(result.factors).toBeDefined();
      expect(result.factors.length).toBeGreaterThan(0);
    });
  });

  describe('calculateDebtToIncomeRatio', () => {
    it('debe calcular correctamente el ratio DTI', async () => {
      const applicant = createMockApplicant({ annualIncome: 72000 });
      const monthlyIncome = 6000;
      const monthlyPayment = 1500;

      const ratio = await service['calculateDebtToIncomeRatio'](monthlyPayment, monthlyIncome);

      expect(ratio).toBe(0.25);
    });

    it('debe retornar 0 cuando el ingreso es 0', async () => {
      const ratio = await service['calculateDebtToIncomeRatio'](1000, 0);

      expect(ratio).toBe(0);
    });
  });

  describe('calculateLoanToValueRatio', () => {
    it('debe calcular correctamente el ratio LTV', async () => {
      const ratio = await service['calculateLoanToValueRatio'](200000, 300000);

      expect(ratio).toBeCloseTo(0.666, 2);
    });

    it('debe retornar 0 cuando el valor de propiedad es 0', async () => {
      const ratio = await service['calculateLoanToValueRatio'](100000, 0);

      expect(ratio).toBe(0);
    });
  });

  describe('calculateCreditScore', () => {
    it('debe calcular score basado en múltiples factores', async () => {
      const applicant = createMockApplicant({
        annualIncome: 80000,
        yearsInEmployment: 5,
        employmentType: 'FULL_TIME' as const
      });

      const score = await service['calculateCreditScore'](applicant);

      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });
  });
});