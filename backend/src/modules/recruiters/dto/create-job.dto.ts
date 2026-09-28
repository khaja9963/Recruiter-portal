import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsInt,
  IsOptional,
  IsArray,
  Min,
  IsDateString
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum WorkModeEnum {
  ONSITE = 'ONSITE',
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID'
}

export enum EmploymentTypeEnum {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  INTERNSHIP = 'INTERNSHIP',
  REMOTE = 'REMOTE'
}

export class CreateJobDto {
  @ApiProperty({ example: 'Senior Frontend Engineer (React/TypeScript)' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Engineering' })
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty({ example: 'San Francisco, CA' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ enum: WorkModeEnum, default: WorkModeEnum.HYBRID })
  @IsEnum(WorkModeEnum)
  workMode: WorkModeEnum;

  @ApiProperty({ enum: EmploymentTypeEnum, default: EmploymentTypeEnum.FULL_TIME })
  @IsEnum(EmploymentTypeEnum)
  employmentType: EmploymentTypeEnum;

  @ApiProperty({ example: 4, description: 'Minimum years of experience' })
  @IsInt()
  @Min(0)
  experienceMin: number;

  @ApiPropertyOptional({ example: 8 })
  @IsInt()
  @IsOptional()
  experienceMax?: number;

  @ApiPropertyOptional({ example: 140000 })
  @IsInt()
  @IsOptional()
  salaryMin?: number;

  @ApiPropertyOptional({ example: 180000 })
  @IsInt()
  @IsOptional()
  salaryMax?: number;

  @ApiPropertyOptional({ example: 'USD', default: 'USD' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ example: 2, default: 1 })
  @IsInt()
  @Min(1)
  openings: number;

  @ApiPropertyOptional({ example: '2026-11-30' })
  @IsDateString()
  @IsOptional()
  applicationDeadline?: string;

  @ApiProperty({ example: 'Join our team to build high scale web applications...' })
  @IsString()
  @IsNotEmpty()
  summary: string;

  @ApiPropertyOptional({ example: 'Full detailed description of day to day expectations...' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: ['Architect and implement responsive React components', 'Collaborate with PMs'] })
  @IsArray()
  @IsString({ each: true })
  responsibilities: string[];

  @ApiProperty({ example: ['React', 'TypeScript', 'Tailwind CSS'] })
  @IsArray()
  @IsString({ each: true })
  requiredSkills: string[];

  @ApiPropertyOptional({ example: ['Next.js', 'WebSockets', 'GraphQL'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  preferredSkills?: string[];

  @ApiPropertyOptional({ example: ['B.S. in Computer Science or equivalent experience'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  qualifications?: string[];

  @ApiPropertyOptional({ example: [] })
  @IsOptional()
  screeningQuestions?: any;
}
