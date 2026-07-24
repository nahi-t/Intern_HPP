// src/news/dto/create-news.dto.ts
import { IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({ description: 'News title', example: 'New Rehabilitation Program' })
  @IsString()
  title!: string;

  @ApiPropertyOptional({ description: 'Short excerpt', example: 'A new program to support inmates...' })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiProperty({ description: 'Publication date (ISO)', example: '2025-02-20' })
  @IsDateString()
  date!: string;

  // image is now handled via file upload, but we keep this optional for direct URL if needed
  @ApiPropertyOptional({ description: 'Image URL (optional if file uploaded)' })
  @IsOptional()
  @IsString()
  image?: string;
}