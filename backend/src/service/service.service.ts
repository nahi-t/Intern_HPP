import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    private cloudinaryService: CloudinaryService, // 👈 inject
  ) {}

  // Create with image upload
  async create(
    createServiceDto: CreateServiceDto,
    file?: Express.Multer.File,
  ): Promise<Service> {
    let imageUrl: string | null=null;

    if (file) {
      const uploadResult = await this.cloudinaryService.uploadImage(
        file
      );
      imageUrl = uploadResult.secure_url; // Cloudinary URL
    }

    const newService = this.serviceRepository.create({
     
      ...createServiceDto,
         image: imageUrl,
     // store the URL
    });

    return await this.serviceRepository.save(newService);
  }

  // Find all services
  async findAll(): Promise<Service[]> {
    return await this.serviceRepository.find();
  }

  // Find one service by id
  async findOne(id: number): Promise<Service> {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  // Update with optional new image
  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
    file?: Express.Multer.File,
  ): Promise<Service> {
    const service = await this.findOne(id);

    let imageUrl = service.image; // keep existing

    if (file) {
      // (Optional) delete old image from Cloudinary here if you want
      const uploadResult = await this.cloudinaryService.uploadImage(
        file
      );
      imageUrl = uploadResult.secure_url;
    }

    const updated = {
      ...service,
      ...updateServiceDto,
      image: imageUrl,
    };

    return await this.serviceRepository.save(updated);
  }

  // Delete a service by id
  async remove(id: number): Promise<void> {
    const result = await this.serviceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
  }
}