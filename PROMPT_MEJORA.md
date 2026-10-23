# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/infrastructure/controllers/loan-request.controller.ts` — `LoanRequestRepositoryPort.findPending`: Se invoca `findPending` sobre `LoanRequestRepositoryPort`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/controllers/loan-request.controller.ts` — `LoanRequestRepositoryPort.findApproved`: Se invoca `findApproved` sobre `LoanRequestRepositoryPort`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/controllers/loan-request.controller.ts` — `LoanRequestRepositoryPort.findRejected`: Se invoca `findRejected` sobre `LoanRequestRepositoryPort`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/controllers/loan-request.controller.ts` — `LoanRequestRepositoryPort.create`: Se invoca `create` sobre `LoanRequestRepositoryPort`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/controllers/loan-request.controller.ts` — `LoanRequestRepositoryPort.updateStatus`: Se invoca `updateStatus` sobre `LoanRequestRepositoryPort`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/application/usecases/loan-request.usecase.ts` — `LoanRequestRepositoryPort.findPendingByApplicant`: Se invoca `findPendingByApplicant` sobre `LoanRequestRepositoryPort`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `test/eligibility.service.spec.ts` — `EligibilityService.assessRisk`: Se invoca `assessRisk` sobre `EligibilityService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `package.json` — `typescript@5.7.0`: typescript declara la version 5.7.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced

### Brecha de conocimiento
Aplica al menos dos patrones GRASP (Patrones de Software para la Asignación de Responsabilidades Generales) en el diseño y desarrollo de un sistema, entre ellos: Experto en Información, Creador, Controlador, Alta Cohesión y Bajo Acoplamiento, Polimorfismo, Fabricación Pura, Indirección y Variaciones Protegidas.

### Misión / candidato
Candidato con nivel Advanced, trabaja en desarrollo Backend con Node.

### Reto
- Tema: Aplicación de Patrones GRASP en el Desarrollo de Sistemas
- Seniority: advanced-l2
- Tipo: mixed
- Título: Diseño y Desarrollo de Sistema con Patrones GRASP
- Tiempo estimado: 20 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Exploración y Modelado Inicial — objetivo: Comprender el dominio y modelar las entidades clave del sistema. — entregable (NO resolver): Modelo conceptual de las entidades y relaciones del sistema de gestión de préstamos hipotecarios.
- Fase 2: Aplicación de Patrones GRASP — objetivo: Aplicar al menos dos patrones GRASP al diseño del sistema. — entregable (NO resolver): Descripción detallada de la aplicación de al menos dos patrones GRASP en el diseño del sistema de gestión de préstamos hipotecarios.
- Fase 3: Implementación y Validación — objetivo: Implementar y validar la aplicación de los patrones GRASP en el sistema. — entregable (NO resolver): Sistema implementado que aplica al menos dos patrones GRASP y cumple con los criterios de aceptación establecidos.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "loan-management-system",
  "version": "1.0.0",
  "description": "Sistema de gestión de préstamos hipotecarios con aplicación de patrones GRASP",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "ts-node src/main.ts",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev --name init",
    "prisma:studio": "prisma studio"
  },
  "dependencies": {
    "@nestjs/common": "11.0.0",
    "@nestjs/core": "11.0.0",
    "@nestjs/platform-express": "11.0.0",
    "@nestjs/swagger": "7.4.0",
    "class-validator": "0.14.1",
    "class-transformer": "0.5.1",
    "reflect-metadata": "0.2.2",
    "rxjs": "7.8.1",
    "prisma": "5.19.0",
    "@prisma/client": "5.19.0"
  },
  "devDependencies": {
    "@nestjs/testing": "11.0.0",
    "@types/jest": "29.5.12",
    "@types/node": "22.5.0",
    "@typescript-eslint/eslint-plugin": "7.0.0",
    "@typescript-eslint/parser": "7.0.0",
    "eslint": "8.57.0",
    "eslint-config-prettier": "9.1.0",
    "eslint-plugin-prettier": "5.1.3",
    "jest": "29.7.0",
    "prettier": "3.3.3",
    "ts-jest": "29.1.5",
    "ts-node": "10.9.2",
    "typescript": "5.7.0"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": ".",
    "incremental": true,
    "skipLibCheck": true,
    "strict": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  "exclude": [
    "node_modules",
    "dist",
    "test",
    "**/*.spec.ts"
  ]
}

// === ARCHIVO: src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './infrastructure/common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de pipes globales
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configuración de filtros globales
  app.useGlobalFilters(new HttpExceptionFilter());

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Loan Management System')
    .setDescription('API para gestión de préstamos hipotecarios')
    .setVersion('1.0')
    .addTag('loans')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

// === ARCHIVO: src/domain/entities/loan-request.entity.ts ===
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

// === ARCHIVO: src/domain/entities/applicant.entity.ts ===
import { IsEmail, IsString, IsUUID, MinLength } from 'class-validator';

export class Applicant {
  @IsUUID()
  id: string;

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  phoneNumber: string;

  @IsString()
  @MinLength(10)
  address: string;

  @IsString()
  @MinLength(11)
  taxId: string;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    address: string,
    taxId: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.taxId = taxId;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  validateTaxId(): boolean {
    return this.taxId.length >= 11;
  }
}

// === ARCHIVO: src/domain/entities/loan.entity.ts ===
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

// === ARCHIVO: src/domain/ports/loan-request.repository.port.ts ===
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

// === ARCHIVO: src/domain/ports/applicant.repository.port.ts ===
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

// === ARCHIVO: src/domain/ports/eligibility.service.port.ts ===
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

// === ARCHIVO: src/infrastructure/repositories/loan-request.repository.ts ===
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

// === ARCHIVO: src/infrastructure/repositories/applicant.repository.ts ===
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

// === ARCHIVO: src/infrastructure/controllers/loan-request.controller.ts ===
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBadRequestResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { LoanRequestRepositoryPort } from '../../domain/ports/loan-request.repository.port';
import { LoanRequest, LoanRequestStatus } from '../../domain/entities/loan-request.entity';

interface CreateLoanRequestDto {
  amount: number;
  termMonths: number;
  purpose: string;
  annualInterestRate: number;
  applicantId: string;
}

interface UpdateLoanRequestDto {
  amount?: number;
  termMonths?: number;
  purpose?: string;
  annualInterestRate?: number;
}

interface LoanRequestQueryDto {
  status?: LoanRequestStatus;
  applicantId?: string;
}

@ApiTags('loan-requests')
@Controller('loan-requests')
export class LoanRequestController {
  constructor(
    @Inject('LoanRequestRepositoryPort')
    private readonly loanRequestRepository: LoanRequestRepositoryPort,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las solicitudes de préstamo', description: 'Retrieves all loan requests from the system' })
  @ApiResponse({ status: 200, description: 'Lista de solicitudes de préstamo obtenida exitosamente', type: [LoanRequest] })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async findAll(@Query() query: LoanRequestQueryDto): Promise<LoanRequest[]> {
    if (query.status) {
      return this.loanRequestRepository.findByStatus(query.status);
    }
    if (query.applicantId) {
      return this.loanRequestRepository.findByApplicantId(query.applicantId);
    }
    return this.loanRequestRepository.findAll();
  }

  @Get('pending')
  @ApiOperation({ summary: 'Obtener solicitudes pendientes', description: 'Retrieves all pending loan requests' })
  @ApiResponse({ status: 200, description: 'Lista de solicitudes pendientes', type: [LoanRequest] })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async findPending(): Promise<LoanRequest[]> {
    return this.loanRequestRepository.findPending();
  }

  @Get('approved')
  @ApiOperation({ summary: 'Obtener solicitudes aprobadas', description: 'Retrieves all approved loan requests' })
  @ApiResponse({ status: 200, description: 'Lista de solicitudes aprobadas', type: [LoanRequest] })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async findApproved(): Promise<LoanRequest[]> {
    return this.loanRequestRepository.findApproved();
  }

  @Get('rejected')
  @ApiOperation({ summary: 'Obtener solicitudes rechazadas', description: 'Retrieves all rejected loan requests' })
  @ApiResponse({ status: 200, description: 'Lista de solicitudes rechazadas', type: [LoanRequest] })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async findRejected(): Promise<LoanRequest[]> {
    return this.loanRequestRepository.findRejected();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una solicitud de préstamo por ID', description: 'Retrieves a single loan request by its unique identifier' })
  @ApiParam({ name: 'id', description: 'Identificador único de la solicitud de préstamo', type: String })
  @ApiResponse({ status: 200, description: 'Solicitud de préstamo encontrada', type: LoanRequest })
  @ApiNotFoundResponse({ description: 'Solicitud de préstamo no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async findById(@Param('id') id: string): Promise<LoanRequest> {
    const loanRequest = await this.loanRequestRepository.findById(id);
    if (!loanRequest) {
      throw new NotFoundException(`Loan request with ID ${id} not found`);
    }
    return loanRequest;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva solicitud de préstamo', description: 'Creates a new loan request in the system' })
  @ApiResponse({ status: 201, description: 'Solicitud de préstamo creada exitosamente', type: LoanRequest })
  @ApiBadRequestResponse({ description: 'Datos de solicitud inválidos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async create(@Body() createDto: CreateLoanRequestDto): Promise<LoanRequest> {
    this.validateCreateDto(createDto);
    const created = await this.loanRequestRepository.create(createDto);
    if (!created) {
      throw new InternalServerErrorException('Failed to create loan request');
    }
    return created;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una solicitud de préstamo', description: 'Updates an existing loan request with new data' })
  @ApiParam({ name: 'id', description: 'Identificador único de la solicitud de préstamo', type: String })
  @ApiResponse({ status: 200, description: 'Solicitud de préstamo actualizada exitosamente', type: LoanRequest })
  @ApiNotFoundResponse({ description: 'Solicitud de préstamo no encontrada' })
  @ApiBadRequestResponse({ description: 'Datos de actualización inválidos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateLoanRequestDto,
  ): Promise<LoanRequest> {
    const existing = await this.loanRequestRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Loan request with ID ${id} not found`);
    }
    const updated = await this.loanRequestRepository.update(id, updateDto);
    if (!updated) {
      throw new InternalServerErrorException('Failed to update loan request');
    }
    return updated;
  }

  @Put(':id/approve')
  @ApiOperation({ summary: 'Aprobar una solicitud de préstamo', description: 'Approves a pending loan request' })
  @ApiParam({ name: 'id', description: 'Identificador único de la solicitud de préstamo', type: String })
  @ApiResponse({ status: 200, description: 'Solicitud de préstamo aprobada exitosamente', type: LoanRequest })
  @ApiNotFoundResponse({ description: 'Solicitud de préstamo no encontrada' })
  @ApiBadRequestResponse({ description: 'La solicitud no puede ser aprobada en su estado actual' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async approve(@Param('id') id: string): Promise<LoanRequest> {
    const existing = await this.loanRequestRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Loan request with ID ${id} not found`);
    }
    if (!existing.isEligibleForReview()) {
      throw new BadRequestException('Loan request is not eligible for approval in its current state');
    }
    const updated = await this.loanRequestRepository.updateStatus(id, LoanRequestStatus.APPROVED);
    if (!updated) {
      throw new InternalServerErrorException('Failed to approve loan request');
    }
    return updated;
  }

  @Put(':id/reject')
  @ApiOperation({ summary: 'Rechazar una solicitud de préstamo', description: 'Rejects a loan request' })
  @ApiParam({ name: 'id', description: 'Identificador único de la solicitud de préstamo', type: String })
  @ApiResponse({ status: 200, description: 'Solicitud de préstamo rechazada exitosamente', type: LoanRequest })
  @ApiNotFoundResponse({ description: 'Solicitud de préstamo no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async reject(@Param('id') id: string): Promise<LoanRequest> {
    const existing = await this.loanRequestRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Loan request with ID ${id} not found`);
    }
    const updated = await this.loanRequestRepository.updateStatus(id, LoanRequestStatus.REJECTED);
    if (!updated) {
      throw new InternalServerErrorException('Failed to reject loan request');
    }
    return updated;
  }

  @Put(':id/review')
  @ApiOperation({ summary: 'Marcar solicitud para revisión', description: 'Marks a loan request for additional review' })
  @ApiParam({ name: 'id', description: 'Identificador único de la solicitud de préstamo', type: String })
  @ApiResponse({ status: 200, description: 'Solicitud de préstamos marcada para revisión', type: LoanRequest })
  @ApiNotFoundResponse({ description: 'Solicitud de préstamo no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async markForReview(@Param('id') id: string): Promise<LoanRequest> {
    const existing = await this.loanRequestRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Loan request with ID ${id} not found`);
    }
    const updated = await this.loanRequestRepository.updateStatus(id, LoanRequestStatus.UNDER_REVIEW);
    if (!updated) {
      throw new InternalServerErrorException('Failed to mark loan request for review');
    }
    return updated;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una solicitud de préstamo', description: 'Deletes a loan request from the system' })
  @ApiParam({ name: 'id', description: 'Identificador único de la solicitud de préstamo', type: String })
  @ApiResponse({ status: 204, description: 'Solicitud de préstamo eliminada exitosamente' })
  @ApiNotFoundResponse({ description: 'Solicitud de préstamo no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async delete(@Param('id') id: string): Promise<void> {
    const existing = await this.loanRequestRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Loan request with ID ${id} not found`);
    }
    const deleted = await this.loanRequestRepository.delete(id);
    if (!deleted) {
      throw new InternalServerErrorException('Failed to delete loan request');
    }
  }

  private validateCreateDto(dto: CreateLoanRequestDto): void {
    if (!dto.amount || dto.amount <= 0) {
      throw new BadRequestException('Amount must be a positive number');
    }
    if (!dto.termMonths || dto.termMonths <= 0) {
      throw new BadRequestException('Term months must be a positive number');
    }
    if (!dto.purpose || dto.purpose.trim().length === 0) {
      throw new BadRequestException('Purpose is required');
    }
    if (!dto.annualInterestRate || dto.annualInterestRate < 0) {
      throw new BadRequestException('Annual interest rate must be non-negative');
    }
    if (!dto.applicantId || dto.applicantId.trim().length === 0) {
      throw new BadRequestException('Applicant ID is required');
    }
  }
}

// === ARCHIVO: src/infrastructure/database/prisma.schema ===
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Applicant {
  id            String        @id @default(uuid())
  firstName     String        @map("first_name")
  lastName      String        @map("last_name")
  email         String        @unique
  phone         String?
  taxId         String        @unique @map("tax_id")
  annualIncome  Decimal       @map("annual_income") @db.Decimal(12, 2)
  createdAt     DateTime      @default(now()) @map("created_at")
  updatedAt     DateTime      @updatedAt @map("updated_at")

  loanRequests  LoanRequest[]

  @@map("applicants")
}

model LoanRequest {
  id                  String          @id @default(uuid())
  applicantId         String          @map("applicant_id")
  amount              Decimal         @db.Decimal(12, 2)
  term                Int
  purpose             String?
  status              LoanRequestStatus @default(PENDING)
  debtToIncomeRatio   Decimal?        @map("debt_to_income_ratio") @db.Decimal(5, 4)
  creditScore         Int?            @map("credit_score")
  notes               String?
  reviewedBy          String?         @map("reviewed_by")
  reviewDate          DateTime?       @map("review_date")
  createdAt           DateTime        @default(now()) @map("created_at")
  updatedAt           DateTime        @updatedAt @map("updated_at")

  applicant           Applicant       @relation(fields: [applicantId], references: [id])
  loan                Loan?

  @@index([applicantId])
  @@index([status])
  @@map("loan_requests")
}

model Loan {
  id                  String      @id @default(uuid())
  loanRequestId       String      @unique @map("loan_request_id")
  status              LoanStatus  @default(ACTIVE)
  principalAmount     Decimal     @map("principal_amount") @db.Decimal(12, 2)
  interestRate        Decimal     @map("interest_rate") @db.Decimal(5, 4)
  monthlyPayment      Decimal     @map("monthly_payment") @db.Decimal(10, 2)
  termMonths          Int         @map("term_months")
  startDate           DateTime    @map("start_date") @db.Date
  endDate             DateTime    @map("end_date") @db.Date
  totalPaid           Decimal     @map("total_paid") @db.Decimal(12, 2) @default(0)
  remainingBalance    Decimal     @map("remaining_balance") @db.Decimal(12, 2)
  defaultDate         DateTime?   @map("default_date")
  createdAt           DateTime    @default(now()) @map("created_at")
  updatedAt           DateTime    @updatedAt @map("updated_at")

  loanRequest         LoanRequest @relation(fields: [loanRequestId], references: [id])

  @@index([loanRequestId])
  @@index([status])
  @@map("loans")
}

enum LoanRequestStatus {
  PENDING     @map("PENDING")
  APPROVED    @map("APPROVED")
  REJECTED    @map("REJECTED")
  UNDER_REVIEW @map("UNDER_REVIEW")
  CANCELLED   @map("CANCELLED")
}

enum LoanStatus {
  ACTIVE      @map("ACTIVE")
  PAID        @map("PAID")
  DEFAULTED   @map("DEFAULTED")
  CANCELLED   @map("CANCELLED")
}

// === ARCHIVO: src/infrastructure/config/database.config.ts ===
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseConfig extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/loan_management',
        },
      },
      log: ['query', 'info', 'warn', 'error'],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();
      console.log('Database connection established successfully');
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.$disconnect();
      console.log('Database connection closed gracefully');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }

  async executeTransaction<T>(
    fn: (tx: PrismaClient) => Promise<T>
  ): Promise<T> {
    return this.$transaction(fn);
  }
}

// === ARCHIVO: src/app.module.ts ===
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

// === ARCHIVO: src/application/services/eligibility.service.ts ===
import { Injectable, Logger } from '@nestjs/common';
import { EligibilityServicePort } from '../../domain/ports/eligibility.service.port';
import { LoanRequest } from '../../domain/entities/loan-request.entity';
import { Applicant } from '../../domain/entities/applicant.entity';

@Injectable()
export class EligibilityService implements EligibilityServicePort {
  private readonly logger = new Logger(EligibilityService.name);
  private static readonly MIN_CREDIT_SCORE = 650;
  private static readonly MAX_DEBT_TO_INCOME_RATIO = 0.43;
  private static readonly MIN_EMPLOYMENT_YEARS = 2;
  private static readonly MIN_LOAN_AMOUNT = 10000;
  private static readonly MAX_LOAN_AMOUNT = 2000000;

  calculateEligibility(loanRequest: LoanRequest, applicant: Applicant): {
    eligible: boolean;
    reasons: string[];
    score: number;
  } {
    this.logger.log(
      `Calculating eligibility for applicant: ${applicant.getFullName()}`,
    );

    const reasons: string[] = [];
    let score = 0;

    const creditScoreCheck = this.validateCreditScore(applicant.creditScore);
    if (!creditScoreCheck.valid) {
      reasons.push(creditScoreCheck.reason);
    } else {
      score += creditScoreCheck.score;
    }

    const employmentCheck = this.validateEmploymentHistory(
      applicant.employmentHistory,
    );
    if (!employmentCheck.valid) {
      reasons.push(employmentCheck.reason);
    } else {
      score += employmentCheck.score;
    }

    const incomeCheck = this.validateIncomeRequirements(
      applicant.annualIncome,
      loanRequest.requestedAmount,
    );
    if (!incomeCheck.valid) {
      reasons.push(incomeCheck.reason);
    } else {
      score += incomeCheck.score;
    }

    const debtToIncomeCheck = this.validateDebtToIncomeRatio(
      loanRequest.calculateDebtToIncomeRatio(),
    );
    if (!debtToIncomeCheck.valid) {
      reasons.push(debtToIncomeCheck.reason);
    } else {
      score += debtToIncomeCheck.score;
    }

    const loanAmountCheck = this.validateLoanAmount(
      loanRequest.requestedAmount,
    );
    if (!loanAmountCheck.valid) {
      reasons.push(loanAmountCheck.reason);
    } else {
      score += loanAmountCheck.score;
    }

    const eligible = reasons.length === 0;
    this.logger.log(
      `Eligibility calculation complete. Eligible: ${eligible}, Score: ${score}, Reasons: ${reasons.length}`,
    );

    return { eligible, reasons, score };
  }

  private validateCreditScore(
    creditScore: number,
  ): { valid: boolean; reason: string; score: number } {
    if (!creditScore || creditScore < EligibilityService.MIN_CREDIT_SCORE) {
      return {
        valid: false,
        reason: `Credit score must be at least ${EligibilityService.MIN_CREDIT_SCORE}`,
        score: 0,
      };
    }

    let score = 20;
    if (creditScore >= 750) score = 30;
    else if (creditScore >= 700) score = 25;

    return { valid: true, reason: '', score };
  }

  private validateEmploymentHistory(
    employmentHistory: { years: number; status: string }[],
  ): { valid: boolean; reason: string; score: number } {
    if (!employmentHistory || employmentHistory.length === 0) {
      return {
        valid: false,
        reason: 'Employment history is required',
        score: 0,
      };
    }

    const totalYears = employmentHistory.reduce(
      (sum, job) => sum + job.years,
      0,
    );

    if (totalYears < EligibilityService.MIN_EMPLOYMENT_YEARS) {
      return {
        valid: false,
        reason: `Minimum ${EligibilityService.MIN_EMPLOYMENT_YEARS} years of employment required`,
        score: 0,
      };
    }

    const hasStableEmployment = employmentHistory.every(
      (job) => job.status === 'active' || job.status === 'permanent',
    );

    let score = 15;
    if (totalYears >= 5 && hasStableEmployment) score = 25;
    else if (totalYears >= 3) score = 20;

    return { valid: true, reason: '', score };
  }

  private validateIncomeRequirements(
    annualIncome: number,
    requestedAmount: number,
  ): { valid: boolean; reason: string; score: number } {
    if (!annualIncome || annualIncome <= 0) {
      return {
        valid: false,
        reason: 'Annual income must be greater than zero',
        score: 0,
      };
    }

    const loanToIncomeRatio = requestedAmount / annualIncome;

    if (loanToIncomeRatio > 5) {
      return {
        valid: false,
        reason: 'Loan amount exceeds 5x annual income',
        score: 0,
      };
    }

    let score = 15;
    if (loanToIncomeRatio <= 2) score = 25;
    else if (loanToIncomeRatio <= 3) score = 20;

    return { valid: true, reason: '', score };
  }

  private validateDebtToIncomeRatio(
    debtToIncomeRatio: number,
  ): { valid: boolean; reason: string; score: number } {
    if (
      debtToIncomeRatio > EligibilityService.MAX_DEBT_TO_INCOME_RATIO
    ) {
      return {
        valid: false,
        reason: `Debt-to-income ratio must not exceed ${EligibilityService.MAX_DEBT_TO_INCOME_RATIO * 100}%`,
        score: 0,
      };
    }

    let score = 15;
    if (debtToIncomeRatio <= 0.28) score = 25;
    else if (debtToIncomeRatio <= 0.36) score = 20;

    return { valid: true, reason: '', score };
  }

  private validateLoanAmount(
    requestedAmount: number,
  ): { valid: boolean; reason: string; score: number } {
    if (requestedAmount < EligibilityService.MIN_LOAN_AMOUNT) {
      return {
        valid: false,
        reason: `Minimum loan amount is ${EligibilityService.MIN_LOAN_AMOUNT}`,
        score: 0,
      };
    }

    if (requestedAmount > EligibilityService.MAX_LOAN_AMOUNT) {
      return {
        valid: false,
        reason: `Maximum loan amount is ${EligibilityService.MAX_LOAN_AMOUNT}`,
        score: 0,
      };
    }

    return { valid: true, reason: '', score: 15 };
  }

  determineApprovalThreshold(score: number): boolean {
    return score >= 70;
  }

  getRiskCategory(score: number): 'low' | 'medium' | 'high' {
    if (score >= 80) return 'low';
    if (score >= 60) return 'medium';
    return 'high';
  }
}

// === ARCHIVO: src/application/usecases/loan-request.usecase.ts ===
import { Injectable, Logger, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { LoanRequestRepositoryPort } from '../../domain/ports/loan-request.repository.port';
import { ApplicantRepositoryPort } from '../../domain/ports/applicant.repository.port';
import { EligibilityService } from '../services/eligibility.service';
import { LoanRequest, LoanRequestStatus } from '../../domain/entities/loan-request.entity';
import { Loan } from '../../domain/entities/loan.entity';
import { LoanRequestCreatedEvent } from '../../domain/events/loan-request-created.event';

export interface CreateLoanRequestInput {
  applicantId: string;
  requestedAmount: number;
  termMonths: number;
  propertyAddress: string;
  propertyValue: number;
  purpose: 'purchase' | 'refinance' | 'construction';
}

export interface LoanRequestResult {
  loanRequest: LoanRequest;
  eligibilityResult: {
    eligible: boolean;
    reasons: string[];
    score: number;
  };
}

@Injectable()
export class LoanRequestUseCase {
  private readonly logger = new Logger(LoanRequestUseCase.name);

  constructor(
    private readonly loanRequestRepository: LoanRequestRepositoryPort,
    private readonly applicantRepository: ApplicantRepositoryPort,
    private readonly eligibilityService: EligibilityService,
  ) {}

  async createLoanRequest(input: CreateLoanRequestInput): Promise<LoanRequestResult> {
    this.logger.log(`Creating loan request for applicant: ${input.applicantId}`);

    const applicant = await this.applicantRepository.findById(input.applicantId);
    if (!applicant) {
      throw new NotFoundException(`Applicant with ID ${input.applicantId} not found`);
    }

    if (!applicant.validateTaxId()) {
      throw new BadRequestException('Applicant tax ID is invalid');
    }

    const existingRequest = await this.loanRequestRepository.findPendingByApplicant(input.applicantId);
    if (existingRequest) {
      throw new ConflictException('Applicant already has a pending loan request');
    }

    const loanRequest = new LoanRequest({
      applicantId: input.applicantId,
      requestedAmount: input.requestedAmount,
      termMonths: input.termMonths,
      propertyAddress: input.propertyAddress,
      propertyValue: input.propertyValue,
      purpose: input.purpose,
      status: LoanRequestStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (!loanRequest.isEligibleForReview()) {
      throw new BadRequestException('Loan request does not meet minimum criteria for review');
    }

    const eligibilityResult = this.eligibilityService.calculateEligibility(loanRequest, applicant);

    const savedRequest = await this.loanRequestRepository.save(loanRequest);
    this.logger.log(`Loan request created with ID: ${savedRequest.id}`);

    return {
      loanRequest: savedRequest,
      eligibilityResult,
    };
  }

  async approveLoanRequest(requestId: string, approvedAmount: number, interestRate: number): Promise<Loan> {
    this.logger.log(`Approving loan request: ${requestId}`);

    const loanRequest = await this.loanRequestRepository.findById(requestId);
    if (!loanRequest) {
      throw new NotFoundException(`Loan request with ID ${requestId} not found`);
    }

    if (loanRequest.status !== LoanRequestStatus.PENDING) {
      throw new BadRequestException('Loan request is not in pending status');
    }

    const applicant = await this.applicantRepository.findById(loanRequest.applicantId);
    if (!applicant) {
      throw new NotFoundException('Applicant not found for this loan request');
    }

    const eligibilityResult = this.eligibilityService.calculateEligibility(loanRequest, applicant);
    
    if (!eligibilityResult.eligible) {
      throw new BadRequestException(`Applicant not eligible: ${eligibilityResult.reasons.join(', ')}`);
    }

    if (!this.eligibilityService.determineApprovalThreshold(eligibilityResult.score)) {
      throw new BadRequestException('Eligibility score does not meet approval threshold');
    }

    const loan = new Loan({
      loanRequestId: requestId,
      applicantId: loanRequest.applicantId,
      principalAmount: approvedAmount,
      interestRate: interestRate,
      termMonths: loanRequest.termMonths,
      monthlyPayment: this.calculateMonthlyPayment(approvedAmount, interestRate, loanRequest.termMonths),
      startDate: new Date().toISOString(),
      status: 'active',
    });

    loanRequest.approve(loan);
    await this.loanRequestRepository.update(loanRequest);

    this.logger.log(`Loan request ${requestId} approved. Loan ID: ${loan.id}`);
    return loan;
  }

  async rejectLoanRequest(requestId: string, rejectionReason: string): Promise<LoanRequest> {
    this.logger.log(`Rejecting loan request: ${requestId}`);

    const loanRequest = await this.loanRequestRepository.findById(requestId);
    if (!loanRequest) {
      throw new NotFoundException(`Loan request with ID ${requestId} not found`);
    }

    if (loanRequest.status !== LoanRequestStatus.PENDING) {
      throw new BadRequestException('Loan request is not in pending status');
    }

    loanRequest.reject();
    await this.loanRequestRepository.update(loanRequest);

    this.logger.log(`Loan request ${requestId} rejected. Reason: ${rejectionReason}`);
    return loanRequest;
  }

  async getLoanRequestById(requestId: string): Promise<LoanRequest> {
    const loanRequest = await this.loanRequestRepository.findById(requestId);
    if (!loanRequest) {
      throw new NotFoundException(`Loan request with ID ${requestId} not found`);
    }
    return loanRequest;
  }

  async getLoanRequestsByApplicant(applicantId: string): Promise<LoanRequest[]> {
    return this.loanRequestRepository.findByApplicantId(applicantId);
  }

  async getAllPendingRequests(): Promise<LoanRequest[]> {
    return this.loanRequestRepository.findByStatus(LoanRequestStatus.PENDING);
  }

  async markForManualReview(requestId: string): Promise<LoanRequest> {
    this.logger.log(`Marking loan request for manual review: ${requestId}`);

    const loanRequest = await this.loanRequestRepository.findById(requestId);
    if (!loanRequest) {
      throw new NotFoundException(`Loan request with ID ${requestId} not found`);
    }

    loanRequest.markForReview();
    await this.loanRequestRepository.update(loanRequest);

    return loanRequest;
  }

  private calculateMonthlyPayment(
    principal: number,
    annualInterestRate: number,
    termMonths: number,
  ): number {
    const monthlyRate = annualInterestRate / 100 / 12;
    const payment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);
    return Math.round(payment * 100) / 100;
  }

  async processLoanRequestAutomation(requestId: string): Promise<{ approved: boolean; loan?: Loan }> {
    this.logger.log(`Processing automated decision for loan request: ${requestId}`);

    const loanRequest = await this.getLoanRequestById(requestId);
    const applicant = await this.applicantRepository.findById(loanRequest.applicantId);

    if (!applicant) {
      throw new NotFoundException('Applicant not found');
    }

    const eligibilityResult = this.eligibilityService.calculateEligibility(loanRequest, applicant);

    if (eligibilityResult.eligible && this.eligibilityService.determineApprovalThreshold(eligibilityResult.score)) {
      const riskCategory = this.eligibilityService.getRiskCategory(eligibilityResult.score);
      const interestRate = this.getInterestRateByRisk(riskCategory);

      const loan = await this.approveLoanRequest(
        requestId,
        loanRequest.requestedAmount,
        interestRate,
      );

      return { approved: true, loan };
    }

    if (eligibilityResult.score >= 50 && eligibilityResult.score < 70) {
      await this.markForManualReview(requestId);
    } else {
      await this.rejectLoanRequest(
        requestId,
        eligibilityResult.reasons.join('; ') || 'Does not meet eligibility criteria',
      );
    }

    return { approved: false };
  }

  private getInterestRateByRisk(riskCategory: 'low' | 'medium' | 'high'): number {
    const rates = {
      low: 4.5,
      medium: 6.0,
      high: 8.5,
    };
    return rates[riskCategory];
  }
}

// === ARCHIVO: test/loan-request.usecase.spec.ts ===
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

// === ARCHIVO: test/eligibility.service.spec.ts ===
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

// === ARCHIVO: README.md ===
# Sistema de Gestión de Préstamos Hipotecarios

## Descripción

Sistema backend desarrollado con NestJS que implementa patrones GRASP para la gestión de préstamos hipotecarios. El proyecto aplica arquitectura hexagonal con separación clara entre dominio, aplicación e infraestructura.

## Requisitos Previos

- Node.js (versión 22.x)
- npm (incluido con Node.js)
- PostgreSQL (para persistencia de datos)

## Instalación

```bash
npm install
```

## Configuración de Base de Datos

El proyecto utiliza Prisma como ORM. Configura las variables de entorno en un archivo `.env`:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/loan_db"
```

## Generar Cliente Prisma

```bash
npm run prisma:generate
```

## Ejecutar Migraciones

```bash
npm run prisma:migrate
```

## Compilación

```bash
npm run build
```

## Ejecución

### Modo Desarrollo

```bash
npm run start:dev
```

### Modo Producción

```bash
npm run start:prod
```

El servidor estará disponible en `http://localhost:3000`

### Documentación API

La documentación Swagger está disponible en `http://localhost:3000/api`

## Pruebas

### Ejecutar Todas las Pruebas

```bash
npm test
```

### Pruebas en Modo Watch

```bash
npm run test:watch
```

### Cobertura de Pruebas

```bash
npm run test:cov
```

## Estructura del Proyecto

```
├── src/
│   ├── main.ts                      # Punto de entrada de la aplicación
│   ├── app.module.ts                # Módulo raíz de NestJS
│   ├── domain/                      # Capa de dominio
│   │   ├── entities/                # Entidades del dominio
│   │   │   ├── loan-request.entity.ts
│   │   │   ├── applicant.entity.ts
│   │   │   └── loan.entity.ts
│   │   └── ports/                   # Interfaces de repositorios y servicios
│   │       ├── loan-request.repository.port.ts
│   │       ├── applicant.repository.port.ts
│   │       └── eligibility.service.port.ts
│   ├── application/                 # Capa de aplicación
│   │   ├── services/                # Servicios de aplicación
│   │   │   └── eligibility.service.ts
│   │   └── usecases/                # Casos de uso
│   │       └── loan-request.usecase.ts
│   └── infrastructure/              # Capa de infraestructura
│       ├── controllers/             # Controladores REST
│       ├── repositories/            # Implementaciones de repositorios
│       ├── database/                # Schema de Prisma
│       └── config/                  # Configuraciones
├── test/                            # Pruebas unitarias
├── prisma/                          # Archivos de Prisma
│   └── schema.prisma
└── package.json
```

## Patrones GRASP Aplicados

### Experto en Información
La clase `EligibilityService` contiene toda la lógica relacionada con el cálculo de elegibilidad, siendo la única responsable de conocer y procesar la información necesaria para determinar si un solicitante es elegible para un préstamo.

### Controlador
El `LoanRequestUseCase` actúa como controlador, coordinando las operaciones entre los puertos de dominio y los servicios de aplicación, gestionando el flujo de la solicitud de préstamo.

### Alta Cohesión
Cada servicio y caso de uso tiene una responsabilidad única y bien definida, evitando la duplicación de lógica de negocio.

### Bajo Acoplamiento
Los puertos del dominio definen abstracciones que permiten cambiar implementaciones sin afectar el código de la capa de aplicación.

### Fabricación Pura
Los puertos e interfaces en la capa de dominio son ejemplos de fabricación pura, creando abstracciones que no existen en el dominio del problema pero son necesarias para la separación de responsabilidades.

## Endpoints Principales

### Solicitudes de Préstamo

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /loan-requests | Crear nueva solicitud de préstamo |
| GET | /loan-requests/:id | Obtener solicitud por ID |
| GET | /loan-requests/applicant/:applicantId | Obtener solicitudes de un solicitante |
| PATCH | /loan-requests/:id/approve | Aprobar solicitud de préstamo |
| PATCH | /loan-requests/:id/reject | Rechazar solicitud de préstamo |

## Tecnologías

- **Framework**: NestJS 11
- **Lenguaje**: TypeScript
- **ORM**: Prisma
- **Base de Datos**: PostgreSQL
- **Testing**: Jest
- **Documentación**: Swagger/OpenAPI

## Licencia

MIT
```
