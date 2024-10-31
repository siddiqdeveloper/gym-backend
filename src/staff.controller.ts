import {
    Controller,
    Post,
    Body,
    UploadedFiles,
    UseInterceptors,
    Put,
    Delete,
    HttpStatus,
    HttpException,
    Param,
    Get
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



    @Put('status/:id')
    async updateStatus(@Param('id') id: string, @Body() body: { isActive: boolean }) {
      try {
        const data = await this.staffService.updateStatus(id, body.isActive);
        return {
          status: true,
          message: 'Staff status updated successfully',
          data: data,
        };
      } catch (error) {
        console.log(error)
        throw new HttpException({
          status: false,
          message: 'Failed to update member status',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }


    @Get('all')
    async findAll() {
      try {
        const data = await this.staffService.findAll();
        return {
          status: true,
          message: 'Staff retrieved successfully',
          data: data,
        };
      } catch (error) {
        throw new HttpException({
          status: false,
          message: 'Failed to retrieve Staff',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }


    @Get('get/:id')
    async findOne(@Param('id') id: number) {
    
      try {
        const data = await this.staffService.findOne(id);
        console.log('data',data)
        return {
          status: true,
          message: 'Staff retrieved successfully',
          data: data,
        };
      } catch (error) {
        console.error('Error retrieving member:', error);
        throw new HttpException({
          status: false,
          message: 'Failed to retrieve member',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }



    @Delete('delete/:id')
    async remove(@Param('id') id: string) {
      try {
        await this.staffService.remove(+id);
        return {
          status: true,
          message: 'Staff deleted successfully',
        };
      } catch (error) {
        throw new HttpException({
          status: false,
          message: 'Failed to delete Staff',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }

  }
  