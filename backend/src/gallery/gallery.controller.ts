import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { GalleryQueryDto } from './dto/gallery-query.dto';
import { GalleryItem } from './entities/gallery.entity';
import { GalleryCategory } from './enum';

@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @ApiOperation({ summary: 'Upload a new image/video to the gallery' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        // category: { enum: GalleryCategory },
        type: { enum: ['image', 'video'] },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 201, type: GalleryItem })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createDto: CreateGalleryDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<GalleryItem> {
    return this.galleryService.create(createDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'List gallery items (filter by category)' })
  @ApiQuery({ name: 'category', enum: GalleryCategory, required: false })
  @ApiResponse({ status: 200, type: [GalleryItem] })
  async findAll(@Query() query: GalleryQueryDto): Promise<GalleryItem[]> {
    return this.galleryService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single gallery item by ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, type: GalleryItem })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<GalleryItem> {
    return this.galleryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update gallery item metadata' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, type: GalleryItem })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateGalleryDto,
  ): Promise<GalleryItem> {
    return this.galleryService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a gallery item (removes from Cloudinary too)' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.galleryService.remove(id);
  }
}