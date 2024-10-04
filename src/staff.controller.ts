import {
    Controller,
    Post,
    Body,
    UploadedFiles,
    UseInterceptors,
  } from '@nestjs/common';
  import { StaffService } from './staff.service';
  import { FilesInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  
  @Controller('staff')
  export class StaffController {
    constructor(private readonly staffService: StaffService) {}
  
    @Post()
    @UseInterceptors(
      FilesInterceptor('otherDocuments', 10, {
        storage: diskStorage({
          destination: './uploads', // Specify upload destination
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
            cb(null, filename);
          },
        }),
      }),
       FilesInterceptor('otherDocuments', 10, {
        storage: diskStorage({
          destination: './uploads', // Specify upload destination
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
            cb(null, filename);
          },
        }),
      }),
    )
    async createStaff(
      @Body() createStaffDto,
      @UploadedFiles() files: any,
    ) {
      return this.staffService.createStaff(createStaffDto, files);
    }
  }
  