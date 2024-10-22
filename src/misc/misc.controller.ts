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
}
