import { CloudinaryService } from './../cloudinary/cloudinary.service';
// src/news/news.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News, NewsType } from './entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
      private cloudinaryService: CloudinaryService,
  ) {}

 
 async create(createNewsDto: CreateNewsDto, file?: Express.Multer.File) {
  let imageUrl: string | null = null;

  if (file) {
    const uploadResult = await this.cloudinaryService.uploadImage(file);
    imageUrl = uploadResult.secure_url;
  }

  // Prepare data with all fields
  const newsData = {
    ...createNewsDto,
    image: imageUrl,                     
    type: createNewsDto.type as NewsType, 
    featured: createNewsDto.featured ?? false, 
  };

  // Create an entity instance (optional but recommended)
  const newsEntity = this.newsRepository.create(newsData);

  // Save and return the persisted entity
  return await this.newsRepository.save(newsEntity);
}

  async findAll(): Promise<News[]> {
    return await this.newsRepository.find({
      order: { date: 'DESC' },
    });
  }

  async findOne(id: number): Promise<News> {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (!news) throw new NotFoundException(`News with ID ${id} not found`);
    return news;
  }





 async update(id: number, updateNewsDto: UpdateNewsDto, file?: Express.Multer.File): Promise<News> {
    // 1. Ensure news exists
    const news = await this.findOne(id);

    // 2. Handle image upload
    let imageUrl = news.image;
    if (file) {
      try {
        // Assuming uploadImage returns the secure_url string directly
  const uploadResult = await this.cloudinaryService.uploadImage(file);
     imageUrl=uploadResult.secure_url

      } catch (error) {
        throw new BadRequestException('Image upload failed');
      }
    }

    // 3. Build update data – only include defined fields (skip undefined)
    const updateData: Partial<News> = {};
    if (updateNewsDto.title !== undefined) updateData.title = updateNewsDto.title;
    if (updateNewsDto.excerpt !== undefined) updateData.excerpt = updateNewsDto.excerpt;
    if (updateNewsDto.date !== undefined) updateData.date = updateNewsDto.date;
    // image is handled separately
    if (imageUrl !== undefined) updateData.image = imageUrl;

    // 4. Perform update using `update` method (does not trigger hooks, but efficient)
    await this.newsRepository.update(id, updateData);

    // 5. Return the updated entity
    return this.findOne(id);
  }

  

  async remove(id: number): Promise<void> {
    const result = await this.newsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
  }
}