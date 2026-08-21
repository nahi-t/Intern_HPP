import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GalleryCategory, GalleryMediaType } from '../enum';

export class CreateGalleryDto {
  @ApiProperty({ example: 'Annual Conference 2025' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ required: false, example: 'Keynote speech by CEO' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: GalleryCategory, example: GalleryCategory.EVENTS })
  @IsEnum(GalleryCategory)
  category!: GalleryCategory;

  // Optional: if you want to force type, otherwise auto-detected
  @ApiProperty({ enum: GalleryMediaType, required: false })
  @IsEnum(GalleryMediaType)
  @IsOptional()
  type?: GalleryMediaType;
}