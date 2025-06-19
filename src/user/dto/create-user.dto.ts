/* eslint-disable @typescript-eslint/no-unsafe-call */

import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { UserType, LabType } from '@prisma/client';

export class CreateLabProfileDto {
  @IsEnum(LabType)
  labType: LabType;

  @IsOptional()
  paymentMethods?: any;
}

export class CreateCadistaProfileDto {
  @IsOptional()
  address?: string;

  @IsOptional()
  bankDetails?: any;
}

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  cpfCnpj?: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserType)
  type: UserType;

  @IsString()
  whatsapp: string;

  @IsBoolean()
  termsAccepted: boolean;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLabProfileDto)
  labProfile?: CreateLabProfileDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCadistaProfileDto)
  cadistaProfile?: CreateCadistaProfileDto;
}
