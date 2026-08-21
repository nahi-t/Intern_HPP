import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { GalleryItem } from './entities/gallery.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module'; // adjust path

@Module({
  imports: [
    TypeOrmModule.forFeature([GalleryItem]),
    CloudinaryModule,
  ],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}