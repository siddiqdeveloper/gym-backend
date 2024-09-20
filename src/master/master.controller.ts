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
 
  // @UseGuards(JwtAuthGuard)
  @Get('user')
  async saveUser(@Body() body, @Res() res: Response, @Req() req: any) {
  
    return res.send([]);
  }

 

}
