import { Controller, Get, Query, Post,HttpException, HttpStatus,Request, Put, Param, Body, } from '@nestjs/common';
import { FellowLeadService } from './fellow-lead.service';
import { query } from 'express';


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


  @Post('unassignupdate')
  async updateFellowLeadsunassignupdate(@Request() req:any){
    
      

      try{
         await this.fellowLeadService.unassignupdate(req.body);
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
  async getFellowLeadsByDate(@Query('date') date: string,@Query('assignDate') assignDate: string) {
 
   
    try {
      const leads = await this.fellowLeadService.findByDate(date,assignDate);
      return {
        status: true,
        message: 'Leads retrieved successfully',
        data: leads,
      };
    } catch (error) {

      console.log(error)
      // Handle any potential errors from the service
  
      throw new HttpException(
        {
          status: false,
          message: 'Failed to get Data',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  @Get('followup-package-expried/by-date')
  async getFellowPackageExpriy(@Query('date') date: string,@Query('assignDate') assignDate: string) {
 
   
    try {
      const leads = await this.fellowLeadService.getFellowPackageExpriy(date,assignDate);
      return {
        status: true,
        message: 'Leads retrieved successfully',
        data: leads,
      };
    } catch (error) {

      console.log(error)
      // Handle any potential errors from the service
  
      throw new HttpException(
        {
          status: false,
          message: 'Failed to get Data',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }



  @Get('continueabsend/by-date')
  async getFellowLeadsContinueabsendByDate(@Query('date') date: string,@Query('assignDate') assignDate: string) {
    try {
      const leads = await this.fellowLeadService.getFellowLeadsContinueabsendByDate(date,assignDate);
      return {
        status: true,
        message: 'Leads retrieved successfully',
        data: leads,
      };
    } catch (error) {
      // Handle any potential errors from the service
      console.log(error)
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

  @Get('dob/by-date')
  async getFellowLeadsByDateDOB(@Query('date') date: string,@Query('assignDate') assignDate: string) {
 
   
    try {
      const leads = await this.fellowLeadService.findByDateDOB(date,assignDate);
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





  @Get('continue-absents/get')
  async getContinueAbsents(@Request() req:any) {
    console.log(req.query);

   
    try {
      const leads = await this.fellowLeadService.getContinueAbsents(req.query);
      return {
        status: true,
        message: 'Retrieved successfully',
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

  @Get('inactive/get')
  async getInactive(@Request() req:any) {
    console.log(req.query);

   
    try {
      const leads = await this.fellowLeadService.getInactive(req.query);
      return {
        status: true,
        message: 'Retrieved successfully',
        data: leads,
      };
    } catch (error) {
      // Handle any potential errors from the service

      console.log(error)
  
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



  @Get('dob/get')
  async getDob(@Request() req:any) {
    console.log(req.query);

   
    try {
      const leads = await this.fellowLeadService.getDob(req.query);
      return {
        status: true,
        message: 'Retrieved successfully',
        data: leads,
      };
    } catch (error) {
      // Handle any potential errors from the service

      console.log(error)
  
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


  @Get('pack/get')
  async getPack(@Request() req:any) {
    console.log(req.query);

   
    try {
      const leads = await this.fellowLeadService.getPack(req.query);
      return {
        status: true,
        message: 'Retrieved successfully',
        data: leads,
      };
    } catch (error) {
      // Handle any potential errors from the service

      console.log(error)
  
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


  @Get('due/get')
  async getdue(@Request() req:any) {
    console.log(req.query);

   
    try {
      const leads = await this.fellowLeadService.getdue(req.query);
      return {
        status: true,
        message: 'Retrieved successfully',
        data: leads,
      };
    } catch (error) {
      // Handle any potential errors from the service

      console.log(error)
  
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
  

  @Get('due-payments/get')
  async AssignedDue(@Query('date') date: string,@Query('assignDate') assignDate: string) {


   
    try {
      const leads = await this.fellowLeadService.AssignedDue(date,assignDate);
      return {
        status: true,
        message: 'Retrieved successfully',
        data: leads,
      };
    } catch (error) {
      // Handle any potential errors from the service

      console.log(error)
  
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


  



  @Get('unassignment')
  async getUnassignment() {
 
   
    try {
      const leads = await this.fellowLeadService.getUnassignment();
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



  
  @Get('dashbaord-summary')
  async getDashbaordSummary(@Request() req:any) {
 
   let query  = req.query;
    try {
      const data = await this.fellowLeadService.getDashbaordSummary(query);
      return {
        status: true,
        message: 'retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error)
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


  


  @Get('inactive/by-date')
  async getFollowupInActive(@Query('date') date: string,@Query('assignDate') assignDate: string) {
 
   
    try {
      const list = await this.fellowLeadService.getFollowupInActive(date,assignDate);
      return {
        status: true,
        message: 'Data retrieved successfully',
        data: list,
      };
    } catch (error) {
      // Handle any potential errors from the service
      console.log(error)
  
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
