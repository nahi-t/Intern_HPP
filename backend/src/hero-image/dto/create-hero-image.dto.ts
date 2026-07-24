import { IsNotEmpty, IsString, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHeroImageDto {
  @ApiPropertyOptional({ description: 'The first line of the hero title' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  titleLine1?: string;

  @ApiPropertyOptional({ description: 'The second line of the hero title' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  titleLine2?: string;

  @ApiPropertyOptional({ description: 'The subtitle text for the hero section' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  subtitle?: string;

  @ApiPropertyOptional({ description: 'The URL of the uploaded image', example: 'https://cloudinary.com/image.jpg' })
  @IsString()
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}