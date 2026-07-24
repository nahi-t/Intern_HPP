import { PartialType } from '@nestjs/swagger';
import { CreateHeroImageDto } from './create-hero-image.dto';

export class UpdateHeroImageDto extends PartialType(CreateHeroImageDto) {}
