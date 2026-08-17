// src/announcements/announcement.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@ApiTags('Announcements')
@Controller('announcements')
export class AnnouncementController {
  constructor(private readonly service: AnnouncementService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateAnnouncementDto })
  create(
    @Body() dto: CreateAnnouncementDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.service.create(dto, file);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAnnouncementDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.service.update(id, dto, file);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}