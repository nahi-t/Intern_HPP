import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';

import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
   imports: [TypeOrmModule.forFeature([Service]),CloudinaryModule],
  controllers: [ServiceController],
  providers: [ServiceService
  ],
})
export class ServiceModule {}
