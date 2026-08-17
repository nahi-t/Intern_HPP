// create-news.dto.ts
import { IsString, IsOptional, IsDateString, IsBoolean, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({ description: 'News title', example: 'New Rehabilitation Program' })
  @IsString()
  title!: string;

  @ApiPropertyOptional({ description: 'Short excerpt', example: 'A new program...' })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiProperty({ description: 'Publication date (ISO)', example: '2026-07-28' })
  @IsDateString()
  date!: string;

  @ApiPropertyOptional({ description: 'Image URL (optional if file uploaded)' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ description: 'News category', example: 'Press Release' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ description: 'Indicates if the news is featured', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === undefined || value === null) return undefined;
    return value === 'true' || value === true || value === '1';
  })
  featured?: boolean;

  @ApiPropertyOptional({ description: 'Type of news', example: 'news', enum: ['news', 'press-release', 'event'] })
  @IsOptional()
  @IsString()
  @IsIn(['news', 'press-release', 'event'])
  type?: string;
}