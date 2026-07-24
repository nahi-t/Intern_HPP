import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {

  constructor() {


  
   
   cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
        timeout: 120000, 
    });

  }

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    
    // 2. Perform the upload
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'prison_cms_uploads' },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) {
            console.error('Cloudinary Error:', error); // Log the specific error
            return reject(new BadRequestException('Cloudinary upload failed'));
          }
          if (!result) {
            return reject(new BadRequestException('Cloudinary returned an empty response'));
          }
          resolve(result);
        },
      );

      uploadStream.end(file.buffer);
    });
  }
}