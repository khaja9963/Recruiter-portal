import {
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  Max,
  IsEnum,
  IsOptional
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Recommendation } from '@prisma/client';

export class CreateInterviewFeedbackDto {
  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  technicalRating: number;

  @ApiProperty({ example: 4, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  communicationRating: number;

  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  problemSolvingRating: number;

  @ApiProperty({ example: 4, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  roleSuitability: number;

  @ApiPropertyOptional({ example: 'Strong grasp of React core internals, modular CSS, and TypeScript generics.' })
  @IsOptional()
  @IsString()
  strengths?: string;

  @ApiPropertyOptional({ example: 'Could improve knowledge of GraphQL caching patterns.' })
  @IsOptional()
  @IsString()
  areasForImprovement?: string;

  @ApiProperty({ example: 'Candidate demonstrated exceptional technical depth. Strongly recommend proceeding to offer.' })
  @IsString()
  @IsNotEmpty()
  overallFeedback: string;

  @ApiProperty({ enum: Recommendation, example: Recommendation.PROCEED })
  @IsEnum(Recommendation)
  @IsNotEmpty()
  recommendation: Recommendation;
}
