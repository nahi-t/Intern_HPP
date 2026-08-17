// src/announcements/dto/create-announcement.dto.ts
import {
  IsString,
  IsOptional,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AnnouncementType, AnnouncementPriority } from '../entities/announcement.entity';

export class CreateAnnouncementDto {
  @ApiProperty({ description: 'Announcement title' })
  @IsString()
  title!: string;

  @ApiPropertyOptional({ description: 'Short excerpt' })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiProperty({ description: 'Publication date (ISO)', example: '2026-08-17' })
  @IsDateString()
  date!: string;

  @ApiProperty({ enum: AnnouncementType, default: AnnouncementType.PUBLIC_NOTICE })
  @IsEnum(AnnouncementType)
  type!: AnnouncementType;

  @ApiProperty({ enum: AnnouncementPriority, default: AnnouncementPriority.MEDIUM })
  @IsEnum(AnnouncementPriority)
  priority!: AnnouncementPriority;

  // Image is handled as a file upload, not in DTO body
}