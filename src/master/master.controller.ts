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

 

}
