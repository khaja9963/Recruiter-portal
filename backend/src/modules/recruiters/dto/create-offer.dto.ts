import {
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  IsOptional,
  IsDateString
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOfferDto {
  @ApiProperty({ example: 'app-02' })
  @IsString()
  @IsNotEmpty()
  applicationId: string;

  @ApiProperty({ example: 'cand-02' })
  @IsString()
  @IsNotEmpty()
  candidateId: string;

  @ApiProperty({ example: 'job-102' })
  @IsString()
  @IsNotEmpty()
  jobId: string;

  @ApiProperty({ example: 185000, description: 'Annual base salary in USD' })
  @IsInt()
  @Min(1)
  baseSalary: number;

  @ApiPropertyOptional({ example: 20000, default: 0 })
  @IsInt()
  @IsOptional()
  bonus?: number;

  @ApiPropertyOptional({ example: '15,000 RSUs (4-year vest)' })
  @IsString()
  @IsOptional()
  equity?: string;

  @ApiPropertyOptional({ example: 'USD', default: 'USD' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ example: '2026-10-20' })
  @IsDateString()
  @IsNotEmpty()
  joiningDate: string;

  @ApiPropertyOptional({ example: 'Standard comprehensive benefits and 401(k) matching package.' })
  @IsOptional()
  @IsString()
  notes?: string;
}
