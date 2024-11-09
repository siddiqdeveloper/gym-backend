import { Controller, Post, Body, Res, Req, HttpException, HttpStatus, Get, Param, Delete, Put } from '@nestjs/common';
import { MiscService } from './misc.service';
import { get } from 'http';
import { Response } from 'express';
import puppeteer from 'puppeteer';
import * as twig from 'twig';
import * as path from 'path';

@Controller('misc')
export class MiscController {

    constructor(private mis: MiscService) {}


    // Electricity Consumption

    @Post('meter/add')
    async createMeter(
      @Body() body,
     
    ) {
        try{
            const reqdata: any = body;
            const check = await this.mis.saveElectricityConsumption(reqdata);
            return {
                status: true,
                message: 'Electricity Consumption created successfully',
                data: check,
            };
        } catch (error) {
            console.log(error)  
            throw new HttpException({
                status: false,
                message: 'Failed to Electricity Consumption',
                error: error.message,
            }, HttpStatus.BAD_REQUEST)
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
        console.log(error)  
        throw new HttpException({
            status: false,
            message: 'Failed to Electricity Consumption',
            error: error.message,
        }, HttpStatus.BAD_REQUEST)
  
       
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
        throw new HttpException({
          status: false,
          message: `Failed to retrieve Electricity Consumption with ID ${id}`,
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
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
        console.log(error)
        throw new HttpException({
          status: false,
          message: 'Failed to retrieve Electricity Consumption',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
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
        throw new HttpException({
          status: false,
          message: `Failed to delete Electricity Consumption with ID ${id}`,
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }


    // status 

    @Put('meterstatus/:id')
    async updateMeterStatus(@Param('id') id: string, @Body() body: { isActive: boolean }) {
      try {
        const data = await this.mis.updateStatus(id, body.isActive);
        return {
          status: true,
          message: 'Meter status updated successfully',
          data: data,
        };
      } catch (error) {
        console.log(error)
        throw new HttpException({
          status: false,
          message: 'Failed to update Meter status',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }



    // water consumption



    @Post('water/add')
    async createWater(
      @Body() body,
     
    ) {
        try{
            const reqdata: any = body;
            const check = await this.mis.createWater(reqdata);
            return {
                status: true,
                message: 'Water Consumption created successfully',
                data: check,
            };
        } catch (error) {
            console.log(error)  
            throw new HttpException({
                status: false,
                message: 'Failed to Water Consumption',
                error: error.message,
            }, HttpStatus.BAD_REQUEST)
        }
      
    
    }






    // update 

    @Post('water/update')
    async updateWater(
      @Body() body,
      @Res() res: Response,
      @Req() request: Request,
    ) {
      try {
        const check = await this.mis.updateWater(body);
        return {
            status: true,
            message: 'Water Consumption Updated successfully',
            data: check,
        };
        
      } catch (error) {
        console.log(error)  
        throw new HttpException({
            status: false,
            message: 'Failed to Water Consumption',
            error: error.message,
        }, HttpStatus.BAD_REQUEST)
  
       
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
        throw new HttpException({
          status: false,
          message: `Failed to retrieve Water Consumption with ID ${id}`,
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
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
        console.log(error)
        throw new HttpException({
          status: false,
          message: 'Failed to retrieve Water Consumption',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
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
        throw new HttpException({
          status: false,
          message: `Failed to delete Water Consumption with ID ${id}`,
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }


    // status 

    @Put('waterstatus/:id')
    async updateWaterStatus(@Param('id') id: string, @Body() body: { isActive: boolean }) {
      try {
        const data = await this.mis.updateWaterStatus(id, body.isActive);
        return {
          status: true,
          message: 'Water status updated successfully',
          data: data,
        };
      } catch (error) {
        console.log(error)
        throw new HttpException({
          status: false,
          message: 'Failed to update Water status',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }



    ////////////// Service Log //////////////////////////


    @Post('service/log/add')
    async createServiceLog(
      @Body() body,
     
    ) {
        try{
            const reqdata: any = body;
            const check = await this.mis.createServiceLog(reqdata);
            return {
                status: true,
                message: 'ServiceLog created successfully',
                data: check,
            };
        } catch (error) {
            console.log(error)  
            throw new HttpException({
                status: false,
                message: 'Failed to ServiceLog',
                error: error.message,
            }, HttpStatus.BAD_REQUEST)
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
        console.log(error)  
        throw new HttpException({
            status: false,
            message: 'Failed to Service Log',
            error: error.message,
        }, HttpStatus.BAD_REQUEST)
  
       
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
        throw new HttpException({
          status: false,
          message: `Failed to retrieve ServiceLog with ID ${id}`,
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
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
        console.log(error)
        throw new HttpException({
          status: false,
          message: 'Failed to retrieve ServiceLog',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
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
        throw new HttpException({
          status: false,
          message: `Failed to delete ServiceLog with ID ${id}`,
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }



    @Put('servicestatus/:id')
    async updateservicestatus(@Param('id') id: string, @Body() body: { isActive: boolean }) {
      try {
        const data = await this.mis.updateservicestatus(id, body.isActive);
        return {
          status: true,
          message: 'Service status updated successfully',
          data: data,
        };
      } catch (error) {
        console.log(error)
        throw new HttpException({
          status: false,
          message: 'Failed to update Service status',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }



    //////////Reminder ////////////////////



    @Post('reminder/add')
    async createReminder(
      @Body() body,
     
    ) {
        try{
            const reqdata: any = body;
            const check = await this.mis.createReminder(reqdata);
            return {
                status: true,
                message: 'Reminder created successfully',
                data: check,
            };
        } catch (error) {
            console.log(error)  
            throw new HttpException({
                status: false,
                message: 'Failed to Reminder',
                error: error.message,
            }, HttpStatus.BAD_REQUEST)
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
        console.log(error)  
        throw new HttpException({
            status: false,
            message: 'Failed to Reminder',
            error: error.message,
        }, HttpStatus.BAD_REQUEST)
  
       
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
        throw new HttpException({
          status: false,
          message: `Failed to retrieve Reminder with ID ${id}`,
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }



    @Get('reminder/all')
    async reminderfindAll() {
      try {
        const data = await this.mis.reminderfindAll();
        console.log('hshshs',data)
        return {
          status: true,
          message: 'Reminder retrieved successfully',
          data: data,
        };
      } catch (error) {
        console.log(error)
        throw new HttpException({
          status: false,
          message: 'Failed to retrieve Reminder',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
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
        throw new HttpException({
          status: false,
          message: `Failed to delete Reminder with ID ${id}`,
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }


    @Put('reminderstatus/:id')
    async updatereminderstatus(@Param('id') id: string, @Body() body: { isActive: boolean }) {
      try {
        const data = await this.mis.updatereminderstatus(id, body.isActive);
        return {
          status: true,
          message: 'Reminder status updated successfully',
          data: data,
        };
      } catch (error) {
        console.log(error)
        throw new HttpException({
          status: false,
          message: 'Failed to update Reminder status',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }





    // ////////////// checkList ///////////////






    @Post('checkList/add')
    async createCheckList(
      @Body() body,
     
    ) {
        try{
            const reqdata: any = body;
            const check = await this.mis.createCheckList(reqdata);
            return {
                status: true,
                message: 'CheckList created successfully',
                data: check,
            };
        } catch (error) {
            console.log(error)  
            throw new HttpException({
                status: false,
                message: 'Failed to CheckList',
                error: error.message,
            }, HttpStatus.BAD_REQUEST)
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
        console.log(error)  
        throw new HttpException({
            status: false,
            message: 'Failed to CheckList',
            error: error.message,
        }, HttpStatus.BAD_REQUEST)
  
       
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
        throw new HttpException({
          status: false,
          message: `Failed to retrieve CheckList with ID ${id}`,
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
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
        console.log(error)
        throw new HttpException({
          status: false,
          message: 'Failed to retrieve CheckList',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
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
        throw new HttpException({
          status: false,
          message: `Failed to delete CheckList with ID ${id}`,
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }

    @Put('checkListStatus/:id')
    async updatecheckListStatus(@Param('id') id: string, @Body() body: { isActive: boolean }) {
      try {
        const data = await this.mis.updatecheckListStatus(id, body.isActive);
        return {
          status: true,
          message: 'CheckList status updated successfully',
          data: data,
        };
      } catch (error) {
        console.log(error)
        throw new HttpException({
          status: false,
          message: 'Failed to update CheckList status',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }





    // workOutType 

    @Post('workoutType/add')
    async createWorkOutType(
      @Body() body,
     
    ) {
        try{
            const reqdata: any = body;
            const check = await this.mis.createWorkOutType(reqdata);
            return {
                status: true,
                message: 'WorkOutType created successfully',
                data: check,
            };
        } catch (error) {
            console.log(error)  
            throw new HttpException({
                status: false,
                message: 'Failed to WorkOutType',
                error: error.message,
            }, HttpStatus.BAD_REQUEST)
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
        console.log(error)  
        throw new HttpException({
            status: false,
            message: 'Failed to WorkOutType',
            error: error.message,
        }, HttpStatus.BAD_REQUEST)
  
       
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
        throw new HttpException({
          status: false,
          message: `Failed to retrieve WorkOutType with ID ${id}`,
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
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
        console.log(error)
        throw new HttpException({
          status: false,
          message: 'Failed to retrieve WorkOutType',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
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
        throw new HttpException({
          status: false,
          message: `Failed to delete WorkOutType with ID ${id}`,
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }


    // status 

    @Put('workOutTypestatus/:id')
    async updateWorkOutType(@Param('id') id: string, @Body() body: { isActive: boolean }) {
      try {
        const data = await this.mis.updateWorkOutType(id, body.isActive);
        return {
          status: true,
          message: 'WorkOutType  updated successfully',
          data: data,
        };
      } catch (error) {
        console.log(error)
        throw new HttpException({
          status: false,
          message: 'Failed to update WorkOutType',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }












    // exercise 


    @Post('exercise/add')
    async createExercise(
      @Body() body,
     
    ) {
        try{
            const reqdata: any = body;
            const check = await this.mis.createExercise(reqdata);
            return {
                status: true,
                message: 'Exercise created successfully',
                data: check,
            };
        } catch (error) {
            console.log(error)  
            throw new HttpException({
                status: false,
                message: 'Failed to Exercise',
                error: error.message,
            }, HttpStatus.BAD_REQUEST)
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
        console.log(error)  
        throw new HttpException({
            status: false,
            message: 'Failed to Exercise',
            error: error.message,
        }, HttpStatus.BAD_REQUEST)
  
       
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
        throw new HttpException({
          status: false,
          message: `Failed to retrieve Exercise with ID ${id}`,
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
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
        console.log(error)
        throw new HttpException({
          status: false,
          message: 'Failed to retrieve WorkOutType',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
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
        throw new HttpException({
          status: false,
          message: `Failed to delete Exercise with ID ${id}`,
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }


    // status 

    @Put('exercisestatus/:id')
    async updateExercisestatus(@Param('id') id: string, @Body() body: { isActive: boolean }) {
      try {
        const data = await this.mis.updateExercisestatus(id, body.isActive);
        return {
          status: true,
          message: 'Exercise  updated successfully',
          data: data,
        };
      } catch (error) {
        console.log(error)
        throw new HttpException({
          status: false,
          message: 'Failed to update Exercise',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
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
        console.log(error)
        throw new HttpException({
          status: false,
          message: 'Failed to retrieve MemberList',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
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
        console.log(error)
        throw new HttpException({
          status: false,
          message: 'Failed to retrieve WorkOutList',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
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
        console.log(error)
        throw new HttpException({
          status: false,
          message: 'Failed to retrieve Exercise',
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }



    ///// pdf ////

  


  @Post('generatepdf')
  async generatePdf(@Body() body: any, @Res() res: Response) {
    console.log(body)
    const templateData = {
      member: body.Member,
      workouts: body.WorkOut,
      exercises: body.Exercise,
    };

    try {
      const pdfBuffer = await this.mis.generatePdf(
        templateData,
        'src/document/workoutchart-pdf.twig',
        'workoutchart'
      );
      

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="workoutchart.pdf"');
      res.send(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).json({ message: 'Failed to generate PDF. Please try again.' });
    }
  }



   
}

