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