import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Hero } from './entities/hero-image.entity';
import { HeroService } from './hero-image.service';
import { HeroController } from './hero-image.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hero]),
    CloudinaryModule, // Injects your file storage stream service layer
  ],
  providers: [HeroService],
  controllers: [HeroController],
})
export class HeroModule {}
