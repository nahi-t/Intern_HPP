import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
imports:[ 
    TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(ConfigService:ConfigService)=>({
    type:"postgres",
    entities:[],
    url:ConfigService.get<string>("DATABASE_URL"),
    synchronize:true,
    autoLoadEntities:true
    })
   
    })]
   
})
export class DatabaseModule {}
