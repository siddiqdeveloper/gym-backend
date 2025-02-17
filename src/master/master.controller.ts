import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  Put,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  CreateClientDto,
  CreateEquipmentDto,
  CreateProjectDto,
} from './master.dto';
import { MasterService } from './master.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../guard/jwt-auth';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('master')
export class MasterController {
  constructor(private ms: MasterService) {}
 

  @Get('fetchCode')
  async fetchCode(@Req() req:any) {
    try {
      console.log(req.query);
      const data = await this.ms.fetchCode(req.query);
      return {
        status: true,
        message: 'Member code generated successfully',
        data: data,
      };
    } catch (error) {
        console.log(error)
      throw new HttpException({
        status: false,
        message: 'Failed to generate member code',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get('user')
  async saveUser(@Body() body, @Res() res: Response, @Req() req: any) {
  
    return res.send([]);
  }

  // Email Templates Configurations
  @Post('email-template/create')
  async create(@Body() createPackageDto) {
    try {
      const data = await this.ms.createEmailTemplate(createPackageDto);
      return {
        status: true,
        message: 'Email Template created successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException({
        status: false,
        message: 'Failed to create package',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('email-template/all')
  async findAll() {
    try {
      const data = await this.ms.findAllEmailTemplate();
      return {
        status: true,
        message: 'Email Templates retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException({
        status: false,
        message: 'Failed to fetch all packages',
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('email-template/get/:id')
  async findOne(@Param('id') id: number) {
    try {
      const data = await this.ms.findOneEmailTemplate(id);
      if (!data) {
        throw new HttpException({
          status: false,
          message: 'Email Template not found',
        }, HttpStatus.NOT_FOUND);
      }
      return {
        status: true,
        message: 'Email Template retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException({
        status: false,
        message: 'Failed to fetch package',
        error: error.message,
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Put('email-template/update/:id')
  async update(@Param('id') id: number, @Body() updatePackageDto) {
    try {
      const data = await this.ms.updateEmailTemplate(id, updatePackageDto);
      return {
        status: true,
        message: 'Email Template updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException({
        status: false,
        message: 'Failed to update package',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('email-template/delete/:id')
  async remove(@Param('id') id: number) {
    try {
      await this.ms.removeEmailTemplate(id);
      return {
        status: true,
        message: 'Email Template deleted successfully',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException({
        status: false,
        message: 'Failed to delete package',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

 

}
