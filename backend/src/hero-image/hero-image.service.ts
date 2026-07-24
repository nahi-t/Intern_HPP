import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero } from './entities/hero-image.entity';
import { CreateHeroImageDto } from './dto/create-hero-image.dto';
import { UpdateHeroImageDto } from './dto/update-hero-image.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';


@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero)
    private readonly heroRepo: Repository<Hero>,
    private readonly cloudinary: CloudinaryService
  ) {}

  // CREATE (Initial setup)
  // async createHeroData(updateHeroDto: CreateHeroImageDto, imageUrl?: string): Promise<Hero> {
  //   const newHero = this.heroRepo.create({
  //     titleLine1: updateHeroDto.titleLine1 || 'Welcome',
  //     titleLine2: updateHeroDto.titleLine2 || 'To the service',
  //     subtitle: updateHeroDto.subtitle || 'Sub',
  //     backgroundImage: imageUrl ,
  //   });
  //   return await this.heroRepo.save(newHero);
  // }

  // READ (Fetch data)
  async getHeroData(id=1) {
    return await this.heroRepo.findOne({ where: { id: id } });
  }

  async remove(id: number){
    const user = await this.heroRepo.findOne({where:{id:id}}); 
    if (!user) return
    await this.heroRepo.remove(user);
    return { message: `hero with ID #${id} successfully removed` };
  }

  // async getALL(){
  //   return await this.heroRepo.find()
  // }

  // UPDATE (Modify later)
 async updateHeroData(updateHeroDto: UpdateHeroImageDto, files?: Express.Multer.File[]): Promise<Hero> {
  // 1. Find the Hero (ID 1)
  let hero = await this.heroRepo.findOne({ where: { id: 1 } });

  // 2. If not found, you can either throw an error or create it
  if (!hero) {
    hero = this.heroRepo.create({ id: 1 });
  }

  // 3. Update Text Fields
  if (updateHeroDto.titleLine1) hero.titleLine1 = updateHeroDto.titleLine1;
  if (updateHeroDto.titleLine2) hero.titleLine2 = updateHeroDto.titleLine2;
  if (updateHeroDto.subtitle) hero.subtitle = updateHeroDto.subtitle;

  // 4. Update Images (The new logic)
  if (files && files.length > 0) {
    // Upload all images in parallel for speed
    const uploadPromises = files.map(file => this.cloudinary.uploadImage(file));
    const results = await Promise.all(uploadPromises);
    
    // Extract URLs and assign to your simple-array column
    hero.backgroundImages = results.map(res => res.secure_url);
  }

  // 5. Save
  return await this.heroRepo.save(hero);
}
}
