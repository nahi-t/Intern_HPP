import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { News } from './entities/news.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
 imports: [TypeOrmModule.forFeature([News]),CloudinaryModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
