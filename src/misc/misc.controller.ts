import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Delete,
  Put,
  UploadedFiles,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { MiscService } from './misc.service';
import { get } from 'http';
import { Response } from 'express';
import puppeteer from 'puppeteer';
import * as twig from 'twig';
import * as path from 'path';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

@Controller('misc')
export class MiscController {
  constructor(private mis: MiscService) {}

  // Electricity Consumption

  


  @Get('backup/excel-download')
async downloadExcelBackup(@Res() res: Response) {
  
    const excelBuffer = await this.mis.exportAllTablesToExcel();

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="database-export.xlsx"',
      'Content-Length': excelBuffer.length,
    });

    res.end(excelBuffer);
  }

  //  @Get('backup/download')
  // async downloadBackup(@Res() res: Response) {
  //   const filePath = await this.mis.generateSqlBackup();
  //   const fileName = path.basename(filePath);

  //   res.setHeader('Content-Type', 'application/sql');
  //   res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  //   const fileStream = fs.createReadStream(filePath);
  //   fileStream.pipe(res);
  // }

  @Post('meter/add')
  async createMeter(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.saveElectricityConsumption(reqdata);
      return {
        status: true,
        message: 'Electricity Consumption created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Electricity Consumption',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update Electricity Consumptions

  @Post('meter/update')
  async updateMeter(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updateMeter(body);
      return {
        status: true,
        message: 'Electricity Consumption Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Electricity Consumption',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // get id

  // @Get('meter/:id')

  @Get('meter/get/:id')
  async meterfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.meterfindOne(id);
      return {
        status: true,
        message: 'Electricity Consumption retrieved successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to retrieve Electricity Consumption with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // manage page data shows

  @Get('meterreading/all')
  async meterReadingfindAll() {
    try {
      const data = await this.mis.meterReadingfindAll();
      return {
        status: true,
        message: 'Electricity Consumption retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Electricity Consumption',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('delete/:id')
  async removeMeter(@Param('id') id: number) {
    try {
      await this.mis.removeMeter(id);
      return {
        status: true,
        message: 'Electricity Consumption deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete Electricity Consumption with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('meterstatus/:id')
  async updateMeterStatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.updateStatus(id, body.isActive);
      return {
        status: true,
        message: 'Meter status updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update Meter status',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // water consumption

  @Post('water/add')
  async createWater(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createWater(reqdata);
      return {
        status: true,
        message: 'Water Consumption created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Water Consumption',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('water/update')
  async updateWater(
    @Body() body
  ) {
    try {
      console.log(body)
        const check = await this.mis.updateWater(body);
        console.log(check,'---');
        return {
          status: true,
          message: 'Water Consumption Updated successfully',
        };
      } catch (error) {
        console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Water Consumption',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('water/get/:id')
  async waterfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.waterfindOne(id);
      return {
        status: true,
        message: 'Water Consumption retrieved successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to retrieve Water Consumption with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('water/all')
  async waterfindAll() {
    try {
      const data = await this.mis.waterfindAll();
      return {
        status: true,
        message: 'Water Consumption retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Water Consumption',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('Waterdelete/:id')
  async removeWater(@Param('id') id: number) {
    try {
      await this.mis.removeWater(id);
      return {
        status: true,
        message: 'Water Consumption deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete Water Consumption with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('waterstatus/:id')
  async updateWaterStatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.updateWaterStatus(id, body.isActive);
      return {
        status: true,
        message: 'Water status updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update Water status',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  ////////////// Service Log //////////////////////////

  @Post('service/log/add')
  async createServiceLog(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createServiceLog(reqdata);
      return {
        status: true,
        message: 'ServiceLog created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to ServiceLog',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('service/log/update')
  async updateServiceLog(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updateServiceLog(body);
      return {
        status: true,
        message: 'Service Log Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Service Log',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('service/log/get/:id')
  async serviceLogfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.serviceLogfindOne(id);
      return {
        status: true,
        message: 'ServiceLog retrieved successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to retrieve ServiceLog with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('service/log/all')
  async serviceLogfindAll() {
    try {
      const data = await this.mis.serviceLogfindAll();
      return {
        status: true,
        message: 'ServiceLog retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve ServiceLog',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('service/log/delete/:id')
  async removeServiceLog(@Param('id') id: number) {
    try {
      await this.mis.removeServiceLog(id);
      return {
        status: true,
        message: 'ServiceLog deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete ServiceLog with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('servicestatus/:id')
  async updateservicestatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.updateservicestatus(id, body.isActive);
      return {
        status: true,
        message: 'Service status updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update Service status',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //////////Reminder ////////////////////

  @Post('reminder/add')
  async createReminder(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createReminder(reqdata);
      return {
        status: true,
        message: 'Reminder created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Reminder',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('reminder/update')
  async updateReminder(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updateReminder(body);
      return {
        status: true,
        message: 'Reminder Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Reminder',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('reminder/get/:id')
  async reminderfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.reminderfindOne(id);
      return {
        status: true,
        message: 'Reminder retrieved successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to retrieve Reminder with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('reminder/all')
  async reminderfindAll() {
    try {
      const data = await this.mis.reminderfindAll();
      console.log('hshshs', data);
      return {
        status: true,
        message: 'Reminder retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Reminder',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('reminder/delete/:id')
  async removeReminder(@Param('id') id: number) {
    try {
      await this.mis.removeReminder(id);
      return {
        status: true,
        message: 'Reminder deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete Reminder with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('reminderstatus/:id')
  async updatereminderstatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.updatereminderstatus(id, body.isActive);
      return {
        status: true,
        message: 'Reminder status updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update Reminder status',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // ////////////// checkList ///////////////

  @Post('checkList/save')
  async createCheckList(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createCheckList(reqdata);
      return {
        status: true,
        message: 'CheckList created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to CheckList',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }




      @Delete('checkListitem/delete/:id')
      async removeCheckListItem(@Param('id') id: number) {
        try {
          await this.mis.removeCheckListItem(id);
          return {
            status: true,
            message: 'CheckListItem deleted successfully',
          };
        } catch (error) {
          throw new HttpException(
            {
              status: false,
              message: `Failed to delete CheckListItem with ID ${id}`,
              error: error.message,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    
      @Put('checkListitemStatus/:id')
      async updatecheckListStatus(
        @Param('id') id: string,
        @Body() body: { isActive: boolean },
      ) {
        try {
          const data = await this.mis.updatecheckListItemStatus(id, body.isActive);
          return {
            status: true,
            message: 'CheckListItem status updated successfully',
            data: data,
          };
        } catch (error) {
          console.log(error);
          throw new HttpException(
            {
              status: false,
              message: 'Failed to update CheckListItem status',
              error: error.message,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }


  
  @Get('checkListitem/all')
  async checkListitemall() {
    try {
      const data = await this.mis.checkListitemall();

      return {
        status: true,
        message: 'CheckList retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve CheckList',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  
  @Post('checkListitem/add')
  async createCheckListItem(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createCheckListItem(reqdata);
      return {
        status: true,
        message: 'CheckList Item created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to CheckList Item',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }





  @Post('checkList/update')
  async updateCheckList(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updateCheckList(body);
      return {
        status: true,
        message: 'CheckList Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to CheckList',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  @Post('checkListItem/update')
  async updateCheckListItem(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updateCheckListItem(body);
      return {
        status: true,
        message: 'CheckList Item Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to CheckList',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('checkList/get/:id')
  async checkListfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.checkListfindOne(id);
      return {
        status: true,
        message: 'CheckList retrieved successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to retrieve CheckList with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('checkList/all')
  async checkListfindAll() {
    try {
      const data = await this.mis.checkListfindAll();

      return {
        status: true,
        message: 'CheckList retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve CheckList',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('checkList/delete/:id')
  async removeCheckList(@Param('id') id: number) {
    try {
      await this.mis.removeCheckList(id);
      return {
        status: true,
        message: 'CheckList deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete CheckList with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('checkListStatus/:id')
  async updatecheckListItemStatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.updatecheckListStatus(id, body.isActive);
      return {
        status: true,
        message: 'CheckList status updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update CheckList status',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // workOutType

  @Post('workoutType/add')
  async createWorkOutType(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createWorkOutType(reqdata);
      return {
        status: true,
        message: 'WorkOutType created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to WorkOutType',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('workoutType/update')
  async updateWorkoutType(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updateWorkoutType(body);
      return {
        status: true,
        message: 'WorkOutType Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to WorkOutType',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('workoutType/get/:id')
  async WorkoutTypefindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.WorkoutTypefindOne(id);
      return {
        status: true,
        message: 'WorkOutType retrieved successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to retrieve WorkOutType with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('workoutType/all')
  async workoutTypefindAll() {
    try {
      const data = await this.mis.workoutTypefindAll();
      return {
        status: true,
        message: 'WorkOutType retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve WorkOutType',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('workOutTypedelete/:id')
  async removeWorkoutType(@Param('id') id: number) {
    try {
      await this.mis.removeWorkoutType(id);
      return {
        status: true,
        message: 'WorkOutType deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete WorkOutType with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('workOutTypestatus/:id')
  async updateWorkOutType(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.updateWorkOutType(id, body.isActive);
      return {
        status: true,
        message: 'WorkOutType  updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update WorkOutType',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // exercise

  @Post('exercise/add')
  async createExercise(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createExercise(reqdata);
      return {
        status: true,
        message: 'Exercise created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Exercise',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('exercise/update')
  async updateExercise(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updateExercise(body);
      return {
        status: true,
        message: 'Exercise Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Exercise',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('exercise/get/:id')
  async exercisefindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.exercisefindOne(id);
      return {
        status: true,
        message: 'Exercise retrieved successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to retrieve Exercise with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('exercise/all')
  async exercisefindAll() {
    try {
      const data = await this.mis.exercisefindAll();
      return {
        status: true,
        message: 'WorkOutType retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve WorkOutType',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('exercisedelete/:id')
  async removeExercise(@Param('id') id: number) {
    try {
      await this.mis.removeExercise(id);
      return {
        status: true,
        message: 'Exercise deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete Exercise with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('exercisestatus/:id')
  async updateExercisestatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.updateExercisestatus(id, body.isActive);
      return {
        status: true,
        message: 'Exercise  updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update Exercise',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //////////////////// WorkOut Chart ////////////////////////

  @Get('getmemberList/all')
  async getmemberList() {
    try {
      const data = await this.mis.getmemberList();
      return {
        status: true,
        message: 'MemberList retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve MemberList',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getWorkOutList/all')
  async getWorkOutList() {
    try {
      const data = await this.mis.getWorkOutList();
      return {
        status: true,
        message: 'WorkOutList retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve WorkOutList',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getExercise/all')
  async getExerciseList() {
    try {
      const data = await this.mis.getExerciseList();
      return {
        status: true,
        message: 'Exercise retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Exercise',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  ///// pdf ////

  // @Post('generatepdf')
  // async generatePdf(@Body() body: any, @Res() res: Response) {
  //   console.log(body)
  //   const templateData = {
  //     member: body.Member,
  //     workouts: body.WorkOut,
  //     exercises: body.Exercise,
  //     rows: body.Rows,
  //   };

  //   console.log(templateData)
  //   try {
  //     const pdfBuffer = await this.mis.generatePdf(
  //       templateData,
  //       'src/document/workoutchart-pdf.twig',
  //       'workoutchart'
  //     );

  //     res.setHeader('Content-Type', 'application/pdf');
  //     res.setHeader('Content-Disposition', 'attachment; filename="workoutchart.pdf"');
  //     res.send(pdfBuffer);
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //     res.status(500).json({ message: 'Failed to generate PDF. Please try again.' });
  //   }
  // }

  @Post('generatepdf')
  async generatePdf(@Body() body: any, @Res() res: Response) {
    const templateData = {
      member: body.Member,
      workouts: body.WorkOut,
      exercises: body.Exercise,
      rows: body.Rows, // Ensure Rows are passed correctly
    };

    console.log('Template Data:', templateData);

    try {
      const pdfBuffer = await this.mis.generatePdf(
        templateData,
        'src/document/workoutchart-pdf.twig',
        'workoutchart',
      );

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="workoutchart.pdf"',
      );
      res.send(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res
        .status(500)
        .json({ message: 'Failed to generate PDF. Please try again.' });
    }
  }

  // freeze

  @Get('getmemberListInFreeze/all')
  async getMemberListInFreeze() {
    try {
      const data = await this.mis.getMemberListInFreeze();
      return {
        status: true,
        message: 'MemberList retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving member list:', error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve MemberList',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //  freeze

  @Post('freeze/add')
  async createfreeze(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createfreeze(reqdata);
      return {
        status: true,
        message: 'Freeze created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Freeze',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('freeze/update')
  async updateFreeze(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updateFreeze(body);
      return {
        status: true,
        message: 'Freeze Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Freeze',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('freezeCode/get/:id')
  async freezefindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.freezefindOne(id);
      console.log('data:', data);
      return {
        status: true,
        message: 'Freeze successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving Freeze:', error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Freeze',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('freeze/all')
  async freezefindAll() {
    try {
      const data = await this.mis.freezefindAll();
      return {
        status: true,
        message: 'freeze retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve freeze',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('freezedelete/:id')
  async removefreeze(@Param('id') id: number) {
    try {
      await this.mis.removefreeze(id);
      return {
        status: true,
        message: 'freeze deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete freeze with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('freezestatus/:id')
  async updatefreezestatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.updatefreezestatus(id, body.isActive);
      return {
        status: true,
        message: 'freeze  updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update freeze',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //  gst save

  @Post('gst/add')
  async createGst(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createGst(reqdata);

      return {
        status: true,
        message: 'GST created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to GST',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('gst/update')
  async updateGst(@Body() body, @Res() res: Response, @Req() request: Request) {
    try {
      const check = await this.mis.updateGst(body);
      return {
        status: true,
        message: 'GST Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Freeze',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('gstCode/get/:id')
  async gstfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.gstfindOne(id);
      console.log('data:', data);
      return {
        status: true,
        message: 'Gst successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving Gst:', error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Gst',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('gst/all')
  async gstfindAll() {
    try {
      const data = await this.mis.gstfindAll();
      return {
        status: true,
        message: 'Gst retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Gst',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('gstdelete/:id')
  async removeGst(@Param('id') id: number) {
    try {
      await this.mis.removeGst(id);
      return {
        status: true,
        message: 'GST deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete GST with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('gststatus/:id')
  async updategststatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.updategststatus(id, body.isActive);
      return {
        status: true,
        message: 'GST  updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update GST',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // petty Cash

  @Post('pettycash/add')
  async createpettycash(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createpettycash(reqdata);

      return {
        status: true,
        message: 'Pettycash created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Pettycash',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('pettycash/update')
  async updatepettycash(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updatepettycash(body);
      return {
        status: true,
        message: 'Pettycash Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Pettycash',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('pettycash/get/:id')
  async pettycashfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.pettycashfindOne(id);
      console.log('data:', data);
      return {
        status: true,
        message: 'Pettycash successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving pettycash:', error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve pettycash',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('pettycash/all')
  async pettycashfindAll() {
    try {
      const data = await this.mis.pettycashfindAll();
      return {
        status: true,
        message: 'Pettycash retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Pettycash',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('pettycashdelete/:id')
  async removepettycash(@Param('id') id: number) {
    try {
      await this.mis.removepettycash(id);
      return {
        status: true,
        message: 'Pettycash deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete pettycash with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('pettycashstatus/:id')
  async updatepettycashstatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.updatepettycashstatus(id, body.isActive);
      return {
        status: true,
        message: 'Pettycash  updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update Pettycash',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //  bank details

  @Post('bank/add')
  async createbank(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createbank(reqdata);

      return {
        status: true,
        message: 'bank created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to bank',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('bank/update')
  async updatebank(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updatebank(body);
      return {
        status: true,
        message: 'bank Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to bank',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('bank/get/:id')
  async bankfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.bankfindOne(id);
      console.log('data:', data);
      return {
        status: true,
        message: 'bank successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving bank:', error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve bank',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('bank/all')
  async bankfindAll() {
    try {
      const data = await this.mis.bankfindAll();
      return {
        status: true,
        message: 'bank retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve bank',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('bankdelete/:id')
  async removebank(@Param('id') id: number) {
    try {
      await this.mis.removebank(id);
      return {
        status: true,
        message: 'bank deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete bank with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('bankstatus/:id')
  async updatebankstatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.updatebankstatus(id, body.isActive);
      return {
        status: true,
        message: 'bank  updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update bank',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // branch

  @Post('branch/add')
  async createbranch(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createbranch(reqdata);

      return {
        status: true,
        message: 'branch created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to branch',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('branch/update')
  async updatebranch(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updatebranch(body);
      return {
        status: true,
        message: 'branch Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to branch',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('branch/get/:id')
  async branchfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.branchfindOne(id);
      console.log('data:', data);
      return {
        status: true,
        message: 'branch successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving branch:', error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve branch',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('branch/all')
  async branchfindAll() {
    try {
      const data = await this.mis.branchfindAll();
      return {
        status: true,
        message: 'branch retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve branch',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('branchdelete/:id')
  async removebranch(@Param('id') id: number) {
    try {
      await this.mis.removebranch(id);
      return {
        status: true,
        message: 'branch deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete branch with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('branchstatus/:id')
  async updatebranchstatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.updatebranchstatus(id, body.isActive);
      return {
        status: true,
        message: 'branch  updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update branch',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //     expense

  @Post('expense/add')
  async createexpense(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createexpense(reqdata);

      return {
        status: true,
        message: 'expense created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to expense',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('expense/update')
  async updateexpense(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updateexpense(body);
      return {
        status: true,
        message: 'expense Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to expense',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('expense/get/:id')
  async expensefindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.expensefindOne(id);
      console.log('data:', data);
      return {
        status: true,
        message: 'expense successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving expense:', error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve expense',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('expense/all')
  async expensefindAll() {
    try {
      const data = await this.mis.expensefindAll();
      return {
        status: true,
        message: 'expense retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve expense',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('expensedelete/:id')
  async removeexpense(@Param('id') id: number) {
    try {
      await this.mis.removeexpense(id);
      return {
        status: true,
        message: 'expense deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete expense with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('expensestatus/:id')
  async updateexpensestatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.updateexpensestatus(id, body.isActive);
      return {
        status: true,
        message: 'expense  updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update expense',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   receive payments

  @Post('receivepayments/add')
  async receivepayments(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.receivepayments(reqdata);

      return {
        status: true,
        message: 'Receive payments created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Receive Payments',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('receivepayments/update')
  async updateReceivepayments(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updateReceivepayments(body);
      return {
        status: true,
        message: 'Receive payments Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Receive payments',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('receivepayments/get/:id')
  async receivepaymentsfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.receivepaymentsfindOne(id);
      console.log('data:', data);
      return {
        status: true,
        message: 'Receivepayments successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving Receivepayments:', error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Receivepayments',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('receivepayments/all')
  async ReceivepaymentsfindAll() {
    try {
      const data = await this.mis.ReceivepaymentsfindAll();
      return {
        status: true,
        message: 'Receivepayments retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Receivepayments',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('Receivepaymentsdelete/:id')
  async removeReceivepayments(@Param('id') id: number) {
    try {
      await this.mis.removeReceivepayments(id);
      return {
        status: true,
        message: 'Receivepayments deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete Receivepayments with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('Receivepaymentsstatus/:id')
  async updateReceivepaymentsstatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.updateReceivepaymentsstatus(
        id,
        body.isActive,
      );
      return {
        status: true,
        message: 'Receive payments status  updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update Receive payments status',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   due payments

  @Get('fetchDuePayments')
  async fetchDuePayments() {
    try {
      const data = await this.mis.fetchDuePayments();
      return {
        status: true,
        message: 'fetchDuePayments retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve fetchDuePayments',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('duepaidPayment/get/:id')
  async duepaidPaymentfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.duepaidPaymentfindOne(id);
      console.log('data:', data);
      return {
        status: true,
        message: 'DuePaidPayment successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving DuePaidPayment:', error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve DuePaidPayment',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getBankDetails/all')
  async getBankDetails() {
    try {
      const data = await this.mis.getBankDetails();
      return {
        status: true,
        message: 'BankDetails retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving member list:', error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve BankDetails',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //    withDraw

  @Post('withDraw/add')
  async createwithDraw(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createwithDraw(reqdata);

      return {
        status: true,
        message: 'withDraw  created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to withDraw',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('withDraw/update')
  async updatewithDraw(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updatewithDraw(body);
      return {
        status: true,
        message: 'withDraw Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to withDraw',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('withDraw/get/:id')
  async withDrawfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.withDrawfindOne(id);
      console.log('data:', data);
      return {
        status: true,
        message: 'withDraw successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving withDraw:', error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve withDraw',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('withDraw/all')
  async withDrawfindAll() {
    try {
      const data = await this.mis.withDrawfindAll();
      return {
        status: true,
        message: 'withDraw retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve withDraw',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('withDrawdelete/:id')
  async removewithDraw(@Param('id') id: number) {
    try {
      await this.mis.removewithDraw(id);
      return {
        status: true,
        message: 'withDraw deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete withDraw with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('withDrawstatus/:id')
  async updatewithDrawstatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.updatewithDrawstatus(id, body.isActive);
      return {
        status: true,
        message: 'withDraw  updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update Receive withDraw',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   topup

  @Post('topup/add')
  async createtopup(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createtopup(reqdata);

      return {
        status: true,
        message: 'topup  created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to topup',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('topup/update')
  async updatetopup(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updatetopup(body);
      return {
        status: true,
        message: 'topup Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to topup',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('topup/get/:id')
  async topupfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.topupfindOne(id);
      console.log('data:', data);
      return {
        status: true,
        message: 'topup successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving topup:', error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve topup',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('topup/all')
  async topupfindAll() {
    try {
      const data = await this.mis.topupfindAll();
      return {
        status: true,
        message: 'topup retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve topup',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('topupdelete/:id')
  async removetopup(@Param('id') id: number) {
    try {
      await this.mis.removetopup(id);
      return {
        status: true,
        message: 'topup deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete topup with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('topupstatus/:id')
  async updatetopupstatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.updatetopupstatus(id, body.isActive);
      return {
        status: true,
        message: 'topup  updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update Receive topup',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   file Upload in BulkUpload

  @Get('staff/all')
  async stafffindAll() {
    try {
      const data = await this.mis.stafffindAll();
      return {
        status: true,
        message: 'staff retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve staff',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('staffTrainer/all')
  async getstaffTrainer() {
    try {
      const data = await this.mis.getstaffTrainer();
      return {
        status: true,
        message: 'staff retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve staff',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   cashtop

  @Post('cashtop/add')
  async createCashtop(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createCashtop(reqdata);
      return {
        status: true,
        message: 'Cashtop  created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Water Consumption',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('cashtop/update')
  async updateCashtop(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updateCashtop(body);
      return {
        status: true,
        message: 'Cashtop Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Cashtop',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('cashtop/get/:id')
  async cashtopfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.cashtopfindOne(id);
      return {
        status: true,
        message: 'Cashtop retrieved successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to retrieve Cashtop with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('cashtop/all')
  async cashtopfindAll() {
    try {
      const data = await this.mis.cashtopfindAll();
      return {
        status: true,
        message: 'Cashtop retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Cashtop',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('cashtopdelete/:id')
  async removeCashtop(@Param('id') id: number) {
    try {
      await this.mis.removeCashtop(id);
      return {
        status: true,
        message: 'Cashtop deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete Cashtop with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('cashtopstatus/:id')
  async updateCashtopStatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.updateCashtopStatus(id, body.isActive);
      return {
        status: true,
        message: 'Cashtop status updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update Cashtop status',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   withDraw

  @Post('withdrawal/add')
  async createWithdrawal(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createWithdrawal(reqdata);
      return {
        status: true,
        message: 'Withdrawal  created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Withdrawal',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('withdrawal/update')
  async updateWithdrawal(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updateWithdrawal(body);
      return {
        status: true,
        message: 'withdrawal Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to withdrawal',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('withdrawal/get/:id')
  async withdrawalfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.withdrawalfindOne(id);
      return {
        status: true,
        message: 'withdrawal retrieved successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to retrieve withdrawal with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('withdrawal/all')
  async withdrawalfindAll() {
    try {
      const data = await this.mis.withdrawalfindAll();
      return {
        status: true,
        message: 'withdrawal retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve withdrawal',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('withdrawaldelete/:id')
  async withdrawaldelete(@Param('id') id: number) {
    try {
      await this.mis.withdrawaldelete(id);
      return {
        status: true,
        message: 'withdrawal deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete withdrawal with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('withdrawalstatus/:id')
  async withdrawalstatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.withdrawalstatus(id, body.isActive);
      return {
        status: true,
        message: 'withdrawal status updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update withdrawal status',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   assets

  @Post('assets/add')
  async createAssets(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createAssets(reqdata);
      return {
        status: true,
        message: 'Assets  created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Assets',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('assets/update')
  async updateAssets(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updateAssets(body);
      return {
        status: true,
        message: 'updateAssets Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to withdrawal',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('assets/get/:id')
  async assetsfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.assetsfindOne(id);
      return {
        status: true,
        message: 'Assets  retrieved successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to retrieve Assets with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('assets/all')
  async assetsfindAll() {
    try {
      const data = await this.mis.assetsfindAll();
      return {
        status: true,
        message: 'Assets retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Assets',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('assetsdelete/:id')
  async assetsdelete(@Param('id') id: number) {
    try {
      await this.mis.assetsdelete(id);
      return {
        status: true,
        message: 'Assets deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete Assets with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('assetsstatus/:id')
  async assetsstatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.assetsstatus(id, body.isActive);
      return {
        status: true,
        message: 'Assets status updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update Assets status',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   feed back

  @Post('feedback/add')
  async createfeedback(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createfeedback(reqdata);
      return {
        status: true,
        message: 'Feedback  created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Feedback',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('feedback/update')
  async updatefeedback(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updatefeedback(body);
      return {
        status: true,
        message: 'Feedback Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Feedback',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('feedback/get/:id')
  async feedbackfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.feedbackfindOne(id);
      return {
        status: true,
        message: 'Feedback  retrieved successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to retrieve Feedback with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('feedback/all')
  async feedbackfindAll() {
    try {
      const data = await this.mis.feedbackfindAll();
      return {
        status: true,
        message: 'Feedback retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Feedback',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('feedbackdelete/:id')
  async feedbackdelete(@Param('id') id: number) {
    try {
      await this.mis.feedbackdelete(id);
      return {
        status: true,
        message: 'Feedback deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete Feedback with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('feedbackstatus/:id')
  async feedbackstatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.feedbackstatus(id, body.isActive);
      return {
        status: true,
        message: 'Feedback status updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update Feedback status',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   free Program

  @Post('freeProgram/add')
  async createfreeProgram(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createfreeProgram(reqdata);
      return {
        status: true,
        message: 'freeProgram  created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to freeProgram',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('freeProgram/update')
  async updatefreeProgram(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updatefreeProgram(body);
      return {
        status: true,
        message: 'freeProgram Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to freeProgram',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('freeProgram/get/:id')
  async freeProgramfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.freeProgramfindOne(id);
      return {
        status: true,
        message: 'freeProgram  retrieved successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to retrieve freeProgram with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('freeProgram/all')
  async freeProgramfindAll() {
    try {
      const data = await this.mis.freeProgramfindAll();
      return {
        status: true,
        message: 'freeProgram retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve freeProgram',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('freeProgramdelete/:id')
  async freeProgramdelete(@Param('id') id: number) {
    try {
      await this.mis.freeProgramdelete(id);
      return {
        status: true,
        message: 'freeProgram deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete freeProgram with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('freeProgramstatus/:id')
  async freeProgramstatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.freeProgramstatus(id, body.isActive);
      return {
        status: true,
        message: 'freeProgram status updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update freeProgram status',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   payment Type

  @Post('paymentType/add')
  async createpaymentType(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.createpaymentType(reqdata);
      return {
        status: true,
        message: 'paymentType  created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to paymentType',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('paymentType/update')
  async updatepaymentType(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updatepaymentType(body);
      return {
        status: true,
        message: 'paymentType Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to paymentType',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('paymentType/get/:id')
  async paymentTypefindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.paymentTypefindOne(id);
      return {
        status: true,
        message: 'paymentType  retrieved successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to retrieve paymentType with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('paymentType/all')
  async paymentTypefindAll() {
    try {
      const data = await this.mis.paymentTypefindAll();
      return {
        status: true,
        message: 'paymentType retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve paymentType',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('paymentTypedelete/:id')
  async paymentTypedelete(@Param('id') id: number) {
    try {
      await this.mis.paymentTypedelete(id);
      return {
        status: true,
        message: 'paymentType deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete paymentType with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('paymentTypestatus/:id')
  async paymentTypestatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.paymentTypestatus(id, body.isActive);
      return {
        status: true,
        message: 'paymentType status updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update paymentType status',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // watch CCTV

  @Post('watchCCTV/add')
  async createwatchCCTV(@Body() body) {
    try {
      const reqdata: any = body;
      console.log('reqdata', reqdata);
      const check = await this.mis.createwatchCCTV(reqdata);
      return {
        status: true,
        message: 'CCTV  created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to CCTV',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('watchCCtv/all')
  async watchCCtvfindAll() {
    try {
      const data = await this.mis.watchCCtvfindAll();
      return {
        status: true,
        message: 'CCTv retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve CCTv',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('update/:id')
  async updateCCTV(
    @Param('id') id: string,
    @Body() body: { key: string; value: string },
  ) {
    const { key, value } = body;

    if (!key || !value) {
      throw new HttpException(
        'Key and Value are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.mis.updateCCTV(id, key, value);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  //   salary

  @Post('salary/add')
  async salaryAdd(@Body() body) {
    try {
      const reqdata: any = body;
      const check = await this.mis.salaryAdd(reqdata);
      return {
        status: true,
        message: 'Salary  created successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Salary',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('salary/update')
  async updatesalary(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updatesalary(body);
      return {
        status: true,
        message: 'Salary Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Salary',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('salary/get/:id')
  async salaryfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.salaryfindOne(id);
      return {
        status: true,
        message: 'Salary  retrieved successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to retrieve Salary with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('salary/all')
  async salaryfindAll() {
    try {
      const data = await this.mis.salaryfindAll();
      return {
        status: true,
        message: 'Salary retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Salary',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('salarydelete/:id')
  async salarydelete(@Param('id') id: number) {
    try {
      await this.mis.salarydelete(id);
      return {
        status: true,
        message: 'Salary deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete Salary with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('salarystatus/:id')
  async salarystatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.salarystatus(id, body.isActive);
      return {
        status: true,
        message: 'Salary status updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update Salary status',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   staff

  @Get('getAllAssignManagerStaff')
  async getAllAssignManagerStaff() {
    try {
      const data = await this.mis.getAllAssignManagerStaff();
      return {
        status: true,
        message: 'staff retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve staff',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getAllAssignManager')
  async getAllAssignManager() {
    try {
      const data = await this.mis.getAllAssignManager();
      return {
        status: true,
        message: 'Manager retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Manager',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('assignManager/save')
  async saveassignManager(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.saveassignManager(body);
      return {
        status: true,
        message: 'Assign Manager Save successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Assign Manager',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('assignManager/update')
  async updateAssignManager(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.mis.updateAssignManager(body);
      return {
        status: true,
        message: 'Assign Manager Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Assign Manager',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('assignManager/get/:id')
  async assignManagerfindOne(@Param('id') id: number) {
    try {
      const data = await this.mis.assignManagerfindOne(id);
      return {
        status: true,
        message: 'Assign Manager  retrieved successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to retrieve Assign Manager with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('assignManager/all')
  async assignManagerfindAll() {
    try {
      const data = await this.mis.assignManagerfindAll();
      return {
        status: true,
        message: 'Assign Manager retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Assign Manager',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // delete

  @Delete('assignManagerdelete/:id')
  async assignManagerdelete(@Param('id') id: number) {
    try {
      await this.mis.assignManagerdelete(id);
      return {
        status: true,
        message: 'Assign Manager deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: `Failed to delete Assign Manager with ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // status

  @Put('assignManagerstatus/:id')
  async assignManagerstatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.mis.assignManagerstatus(id, body.isActive);
      return {
        status: true,
        message: 'Assign Manager status updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update Assign Manager status',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }







//   StaffPerfomarnce Save


  // @Post('staffPerformance/add')
  //   // async staffPerformanceSave(@Body() body) {
  //   //   try {
  //   //     const reqdata: any = body;
  //   //     const check = await this.mis.staffPerformanceSave(reqdata);
  //   //
  //   //     return {
  //   //       status: true,
  //   //       message: 'StaffPerformance  created successfully',
  //   //       data: check,
  //   //     };
  //   //   } catch (error) {
  //   //     console.log(error);
  //   //     throw new HttpException(
  //   //       {
  //   //         status: false,
  //   //         message: 'Failed to StaffPerformance',
  //   //         error: error.message,
  //   //       },
  //   //       HttpStatus.BAD_REQUEST,
  //   //     );
  //   //   }
  //   // }


  @Post('staffPerformance/add')
  async staffPerformanceSave(@Body() body: any) {
    try {
      console.log("Received Data in Backend:", body);
      const savedData = await this.mis.staffPerformanceSave(body);
      console.log("Saved Data:", savedData);

      return {
        status: true,
        message: "Staff Performance created successfully",
        data: savedData,
      };
    } catch (error) {
      console.error("Error in Backend:", error);
      throw new HttpException(
        {
          status: false,
          message: "Failed to create Staff Performance",
          error: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }



}
