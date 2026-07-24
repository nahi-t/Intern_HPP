import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger'; // 👈 Added ApiConsumes and ApiBody
import { ServiceService } from './service.service';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/decorator/isPublic.gurd';
import { multerConfig } from '../cloudinary/multer.config';

@ApiTags('services')

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
 @UseInterceptors(FileInterceptor('files', multerConfig)) // 'files' is the field name for multiple images
  @ApiConsumes('multipart/form-data') // 👈 Required for file upload in Swagger
  @ApiBody({
      schema: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      files: { type: 'string', format: 'binary' }, // <-- field name
    },
  },
  })
  @ApiOperation({ summary: 'Create a new service with image(s)' })
  @ApiCreatedResponse({
    description: 'The service has been successfully created.',
    type: Service,
  })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  create(
    @UploadedFile() files: Express.Multer.File,
    @Body() createServiceDto: CreateServiceDto,
  ) {
  //     console.log('File received:', files);
  // console.log('File size:', files?.size);
  // console.log('Buffer length:', files?.buffer?.length);
    return this.serviceService.create(createServiceDto, files);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Retrieve all services' })
  @ApiOkResponse({
    description: 'List of all services.',
    type: [Service],
  })
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single service by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the service',
    type: Number,
    example: 1,
  })
  @ApiOkResponse({
    description: 'The service details.',
    type: Service,
  })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing service (partial updates allowed)' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the service to update',
    type: Number,
    example: 1,
  })
  @ApiOkResponse({
    description: 'The updated service.',
    type: Service,
  })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a service by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the service to delete',
    type: Number,
    example: 1,
  })
  @ApiNoContentResponse({
    description: 'Service successfully deleted. (No content returned)',
  })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.remove(id);
  }
}