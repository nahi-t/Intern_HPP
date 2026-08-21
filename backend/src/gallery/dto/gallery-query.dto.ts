import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { GalleryCategory } from '../enum';

export class GalleryQueryDto {
  @ApiPropertyOptional({ enum: GalleryCategory })
  @IsEnum(GalleryCategory)
  @IsOptional()
  category?: GalleryCategory;
}