import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRecruiterProfileDto {
  @ApiPropertyOptional({ example: 'Sarah Jenkins' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: '+1 (555) 234-5678' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2' })
  @IsOptional()
  @IsString()
  avatar?: string;
}
