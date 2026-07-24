// src/news/news.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { News } from './entities/news.entity';
import { Public } from '../auth/decorator/isPublic.gurd';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()

  @ApiOperation({ summary: 'Create a news article (with optional image upload)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        excerpt: { type: 'string' },
        date: { type: 'string', format: 'date' },
        image: { type: 'string', format: 'binary' }, // file
      },
    },
  })
  @ApiResponse({ status: 201, description: 'News created successfully', type: News })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createNewsDto: CreateNewsDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
   
    return this.newsService.create(createNewsDto, file);
  }

  @Get()
   @Public()
  @ApiOperation({ summary: 'Get all news articles (ordered by date descending)' })
  @ApiResponse({ status: 200, description: 'List of news', type: [News] })
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single news by ID' })
  @ApiParam({ name: 'id', description: 'News ID' })
  @ApiResponse({ status: 200, description: 'News found', type: News })
  @ApiResponse({ status: 404, description: 'News not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  @Public()
  @ApiOperation({ summary: 'Update a news article (optional image upload)' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'News ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        excerpt: { type: 'string' },
        date: { type: 'string', format: 'date' },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'News updated', type: News })
  @ApiResponse({ status: 404, description: 'News not found' })
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNewsDto: UpdateNewsDto,
    // @UploadedFile() file?: Express.Multer.File,
  ) {
    // let imageUrl: string | undefined;
    // if (file) {
    //   try {
    //     imageUrl = await this.cloudinaryService.uploadImage(file);
    //   } catch (error) {
    //     throw new BadRequestException('Image upload failed');
    //   }
    // }
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a news article' })
  @ApiParam({ name: 'id', description: 'News ID' })
  @ApiResponse({ status: 204, description: 'News deleted' })
  @ApiResponse({ status: 404, description: 'News not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.remove(id);
  }
}