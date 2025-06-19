import {
  IsString,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsUUID,
  IsArray,
} from 'class-validator';

export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  type: string;

  @IsString()
  briefing: string;

  @IsString()
  originalFile: string;

  @IsBoolean()
  urgent: boolean;

  @IsDateString()
  deliveryDate: string;

  @IsNumber()
  value: number;

  @IsUUID()
  labId: string;

  @IsArray()
  @IsUUID('4', { each: true })
  skills: string[];
}
