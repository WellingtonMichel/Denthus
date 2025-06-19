import { JobType } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsUUID } from 'class-validator';

export class CreateCreditDto {
  @IsUUID()
  userId: string;

  @IsEnum(JobType)
  type: JobType;

  @IsInt()
  quantity: number;

  @IsOptional()
  expiresAt?: Date;
}
