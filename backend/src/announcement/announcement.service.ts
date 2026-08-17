// src/announcements/announcement.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Announcement } from './entities/announcement.entity';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(Announcement)
    private announcementRepository: Repository<Announcement>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(dto: CreateAnnouncementDto, file?: Express.Multer.File) {
    let imageUrl: string | null = null;
    if (file) {
      const result = await this.cloudinaryService.uploadImage(file);
      imageUrl = result.secure_url;
    }

    const announcement = this.announcementRepository.create({
      ...dto,
      image: imageUrl,
    });
    return this.announcementRepository.save(announcement);
  }

  async findAll() {
    return this.announcementRepository.find({
      order: { date: 'DESC' },
    });
  }

  async findOne(id: number) {
    const announcement = await this.announcementRepository.findOne({ where: { id } });
    if (!announcement) throw new NotFoundException(`Announcement #${id} not found`);
    return announcement;
  }

  async update(id: number, dto: UpdateAnnouncementDto, file?: Express.Multer.File) {
    const announcement = await this.findOne(id);

    let imageUrl = announcement.image;
    if (file) {
      const result = await this.cloudinaryService.uploadImage(file);
      imageUrl = result.secure_url;
    }

    Object.assign(announcement, dto, { image: imageUrl });
    return this.announcementRepository.save(announcement);
  }

  async remove(id: number) {
    const announcement = await this.findOne(id);
    return this.announcementRepository.remove(announcement);
  }
}