import { Controller, Post, Body, Res, Req, HttpException, HttpStatus, Get, Param, Delete } from '@nestjs/common';
import { MiscService } from './misc.service';
import { get } from 'http';

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

  
    @Get('meter/:id') 
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




    @Get('water/:id') 
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




    @Get('service/log/:id') 
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




    @Get('reminder/:id') 
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




    @Get('checkList/:id') 
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
        console.log('hshshs',data)
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



}
