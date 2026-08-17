import { Module } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Announcement } from './entities/announcement.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
    imports: [TypeOrmModule.forFeature([Announcement]), CloudinaryModule],
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
})
export class AnnouncementModule {}
