import { IsString, IsUrl, IsOptional, Length, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServiceDto {
  // @ApiProperty({
  //   description: 'URL or path to the service image',
  //   example: 'https://example.com/images/service-1.jpg',
  //   maxLength: 255,
  // })
  // @IsUrl()
  // @MaxLength(255)
  // image!: string;

  @ApiProperty({
    description: 'Title of the service',
    example: 'Rehabilitation Programs',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @Length(3, 100)
  title!: string;

  @ApiPropertyOptional({
    description: 'Detailed description of the service',
    example: 'Transforming lives through evidence-based rehabilitation.',
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}