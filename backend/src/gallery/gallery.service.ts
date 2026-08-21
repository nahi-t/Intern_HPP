import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GalleryItem } from './entities/gallery.entity';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { GalleryQueryDto } from './dto/gallery-query.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service'; // adjust path
import { GalleryCategory, GalleryMediaType } from './enum';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(GalleryItem)
    private readonly galleryRepo: Repository<GalleryItem>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createDto: CreateGalleryDto, file: Express.Multer.File): Promise<GalleryItem> {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const uploadResult = await this.cloudinaryService.uploadImage(file);

    const mediaType = file.mimetype.startsWith('video/')
      ? GalleryMediaType.VIDEO
      : GalleryMediaType.IMAGE;

    const galleryItem = this.galleryRepo.create({
      ...createDto,
      type: createDto.type || mediaType,
      thumbnailUrl: uploadResult.thumbnailUrl || uploadResult.url,
      mediaUrl: uploadResult.url,
    });

    return this.galleryRepo.save(galleryItem);
  }

  async findAll(query: GalleryQueryDto): Promise<GalleryItem[]> {
    const where: any = {};
    if (query.category && query.category !== GalleryCategory.ALL) {
      where.category = query.category;
    }
    return this.galleryRepo.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<GalleryItem> {
    const item = await this.galleryRepo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Gallery item with ID ${id} not found`);
    }
    return item;
  }

  async update(id: string, updateDto: UpdateGalleryDto): Promise<GalleryItem> {
    const item = await this.findOne(id);
    Object.assign(item, updateDto);
    return this.galleryRepo.save(item);
  }

  async remove(id: string): Promise<void> {
    const item = await this.findOne(id);
    // const publicId = this.extractPublicId(item.mediaUrl);
    // if (publicId) {
    //   await this.cloudinaryService.uploadImage(publicId);
    // }
    await this.galleryRepo.remove(item);
  }

  private extractPublicId(url: string): string | null {
    const parts = url.split('/');
    const fileWithExt = parts[parts.length - 1];
    return fileWithExt.split('.')[0] || null;
  }
}