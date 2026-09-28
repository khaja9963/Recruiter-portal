import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsDateString,
  IsEmail,
  IsUrl
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InterviewType } from '@prisma/client';

export class ScheduleInterviewDto {
  @ApiProperty({ example: 'app-01' })
  @IsString()
  @IsNotEmpty()
  applicationId: string;

  @ApiProperty({ example: 'cand-01' })
  @IsString()
  @IsNotEmpty()
  candidateId: string;

  @ApiProperty({ example: 'job-101' })
  @IsString()
  @IsNotEmpty()
  jobId: string;

  @ApiProperty({ example: 'Technical Deep Dive' })
  @IsString()
  @IsNotEmpty()
  roundName: string;

  @ApiProperty({ example: 'Michael Vance (Staff FE Eng)' })
  @IsString()
  @IsNotEmpty()
  interviewerName: string;

  @ApiProperty({ example: 'michael.vance@clyptus.com' })
  @IsEmail()
  @IsNotEmpty()
  interviewerEmail: string;

  @ApiProperty({ example: '2026-09-30' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: '02:00 PM' })
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ example: '03:00 PM' })
  @IsString()
  @IsNotEmpty()
  endTime: string;

  @ApiProperty({ enum: InterviewType, default: InterviewType.VIDEO })
  @IsEnum(InterviewType)
  type: InterviewType;

  @ApiPropertyOptional({ example: 'https://meet.google.com/abc-defg-hij' })
  @IsOptional()
  meetingLink?: string;

  @ApiPropertyOptional({ example: 'Focus on React component state, custom hooks, and virtualized lists performance.' })
  @IsOptional()
  @IsString()
  notes?: string;
}
