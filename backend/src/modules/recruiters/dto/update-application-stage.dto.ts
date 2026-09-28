import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApplicationStage } from '@prisma/client';

export class UpdateApplicationStageDto {
  @ApiProperty({
    enum: ApplicationStage,
    example: ApplicationStage.SHORTLISTED,
    description: 'Target recruitment stage: APPLIED, SCREENING, SHORTLISTED, INTERVIEW, OFFER, HIRED, REJECTED'
  })
  @IsEnum(ApplicationStage)
  @IsNotEmpty()
  stage: ApplicationStage;

  @ApiPropertyOptional({ example: 'Candidate demonstrated outstanding coding skills in deep dive round.' })
  @IsOptional()
  @IsString()
  reason?: string;
}
