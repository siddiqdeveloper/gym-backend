import {
    Controller,
    Post,
    Body,
    UploadedFiles,
    UseInterceptors,
  } from '@nestjs/common';
  import { StaffService } from './staff.service';
  import { FileFieldsInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  
  @Controller('staff')
  export class StaffController {
    constructor(private readonly staffService: StaffService) {}
  
    @Post()
    @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'staffPhoto', maxCount: 1 },
        { name: 'resume', maxCount: 1 },
        { name: 'otherDocuments', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads', // Specify the upload directory
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
            cb(null, filename);
          },
        }),
      },
    ),
  )
    async createStaff(
      @Body() createStaffDto,
      @UploadedFiles() files: any,
    ) {
      return this.staffService.createStaff(createStaffDto, files);
    }
  }
  