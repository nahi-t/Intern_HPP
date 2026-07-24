
import { Controller, Get, Post, Patch, Body, UploadedFile, UseInterceptors, BadRequestException, Param, Delete, ParseIntPipe, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { HeroService } from './hero-image.service';

import { UpdateHeroImageDto } from './dto/update-hero-image.dto';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../user/enum/user-role.enum';
import { CreateHeroImageDto } from './dto/create-hero-image.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Public } from '../auth/decorator/isPublic.gurd';


@Controller('hero')
export class HeroController {
  constructor(
    private readonly heroService: HeroService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
 @Public()
  @Get()
  async getHerobyId() {
    return await this.heroService.getHeroData();
  }
  @Delete(':id')
  @Roles(Role.SUPERADMIN) 
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.heroService.remove(id);
  }

  // @Get('all')
  // async getall(){
  //   return await this.heroService.getALL()
  // }

  // 1. CREATE ACTION ROUTE
@Post('create')
@UseInterceptors(FileInterceptor('file'))
@ApiConsumes('multipart/form-data') // <--- Tells Swagger to expect a file upload form
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      titleLine1: { type: 'string' },
      titleLine2: { type: 'string' },
      subtitle: { type: 'string' },
      file: { 
        type: 'string', 
        format: 'binary' // <--- This creates the "Choose File" button
      },
    },
  },
})

async createHero(
  @Body() createHeroDto: CreateHeroImageDto, 
  @UploadedFile() file?: Express.Multer.File
) {
  console.log("RECEIVED FILE OBJECT:", file);
  let secureUrl: string | undefined = undefined;

  if (file) {
    try {
      const uploadResult = await this.cloudinaryService.uploadImage(file);
      
      // --- ADD THIS LOG ---
      console.log('Cloudinary Upload Result:', uploadResult); 
      // --------------------

      secureUrl = uploadResult?.secure_url;
      
      if (!secureUrl) {
         console.error('Upload succeeded, but secure_url is missing!');
      }
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      throw new Error('Image upload failed'); // Stop execution if upload fails
    }
  }

  // Debug: What is being sent to the service?
  console.log('Sending to Service:', { ...createHeroDto, imageUrl: secureUrl });

  // return await this.heroService.createHeroData(createHeroDto, secureUrl);
}
  // 2. UPDATE ACTION ROUTE
 @Patch('update')

@UseInterceptors(FilesInterceptor('files', 10)) // Ensure 'files' matches the string below
@ApiConsumes('multipart/form-data') // Tells Swagger this is a form upload
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      titleLine1: { type: 'Welcome to the Harari Regiona' },
      titleLine2: { type: 'State Corrections Service' },
      subtitle: { type: 'Fostering Security, Justice, and Rehabilitation' },
      // This is the magic part that enables multiple file selection in Swagger UI
      files: {
        type: 'array',
        items: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  },
})
async update(
  @UploadedFiles() files: Express.Multer.File[], 
  @Body() updateDto: UpdateHeroImageDto
) {
  return this.heroService.updateHeroData(updateDto, files);
}
}
