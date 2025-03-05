import { Controller, Get, Query, Post,HttpException, HttpStatus,Request, Put, Param, Body, } from '@nestjs/common';
import { FellowLeadService } from './fellow-lead.service';


@Controller('fellow-leads')
export class FellowLeadController {
  constructor(
    
    private readonly fellowLeadService: FellowLeadService
  ) {}

  // Fetch fellow leads by a specific date

  @Post('update')
  async updateFellowLeadsByDate(@Request() req:any){
    
      

      try{
         await this.fellowLeadService.updateLeads(req.body);
      }
      catch(e){
        console.log(e.message)

      }

    return {
      status: true,
      message: 'Leads information Updated', 
    };

  }

  @Get('by-date')
  async getFellowLeadsByDate(@Query('date') date: string) {
 
   
    try {
      const leads = await this.fellowLeadService.findByDate(date);
      return {
        status: true,
        message: 'Leads retrieved successfully',
        data: leads,
      };
    } catch (error) {
      // Handle any potential errors from the service
  
      throw new HttpException(
        {
          status: false,
          message: 'Failed to create lead',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('by-dobdate')
  async getFellowLeadsByDateDOB(@Query('date') date: string) {
 
   
    try {
      const leads = await this.fellowLeadService.findByDateDOB(date);
      return {
        status: true,
        message: 'Leads retrieved successfully',
        data: leads,
      };
    } catch (error) {
      // Handle any potential errors from the service
  
      throw new HttpException(
        {
          status: false,
          message: 'Failed to create lead',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  @Get('package-expiry')
  async getPackageExpiry(@Query('count') count: string) {
 
   
    try {
      const leads = await this.fellowLeadService.getPackageExpiry(count);
      return {
        status: true,
        message: 'Data retrieved successfully',
        data: leads,
      };
    } catch (error) {
      // Handle any potential errors from the service
  
      throw new HttpException(
        {
          status: false,
          message: 'Failed to create lead',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('inactiveLeads')
  async getInActiveLeads() {
 
   
    try {
      const leads = await this.fellowLeadService.getInActiveLeads();
      return {
        status: true,
        message: 'Leads retrieved successfully',
        data: leads,
      };
    } catch (error) {
      // Handle any potential errors from the service
  
      throw new HttpException(
        {
          status: false,
          message: 'Failed to create lead',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  @Get('followup-in-active')
  async getFollowupInActive(@Query('date') date: string) {
 
   
    try {
      const list = await this.fellowLeadService.getFollowupInActive(date);
      return {
        status: true,
        message: 'Data retrieved successfully',
        data: list,
      };
    } catch (error) {
      // Handle any potential errors from the service
  
      throw new HttpException(
        {
          status: false,
          message: 'Failed to create lead',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }



  @Put('status/:id')
  async updateStatus(@Param('id') id: string, @Body() body: { isActive: boolean }) {
    try {
      const data = await this.fellowLeadService.updateStatus(id, body.isActive);
      return {
        status: true,
        message: 'Fellow Lead status updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error)
      throw new HttpException({
        status: false,
        message: 'Failed to update Fellow Lead status',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
