import { memoryStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

export const multerConfig = {
  storage: memoryStorage(),
  fileFilter: (req:any, file:any, cb:any) => {
    if (!file.mimetype.match(/^image\/(jpeg|png|gif|webp|jpg|svg)$/)) {
      return cb(new BadRequestException('Only JPEG, PNG, GIF, WEBP allowed'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
};