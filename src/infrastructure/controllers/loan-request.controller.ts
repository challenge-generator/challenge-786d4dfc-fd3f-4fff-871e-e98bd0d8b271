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