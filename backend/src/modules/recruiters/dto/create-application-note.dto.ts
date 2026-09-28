import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationNoteDto {
  @ApiProperty({
    example: 'Great initial recruiter screening. Strong grasp of React state management and performance optimization.',
    description: 'Internal confidential recruiter note content'
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
