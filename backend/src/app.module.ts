import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import {ConfigModule} from "@nestjs/config"
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HeroModule } from './hero-image/hero-image.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ServiceModule } from './service/service.module';
import { NewsModule } from './news/news.module';
import { AnnouncementModule } from './announcement/announcement.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    HeroModule,
    CloudinaryModule,
    ServiceModule,
    NewsModule,
    AnnouncementModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
