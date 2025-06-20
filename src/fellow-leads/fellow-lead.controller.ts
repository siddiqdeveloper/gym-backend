import { Controller, Get, Query, Post,HttpException, HttpStatus,Request, Put, Param, Body, Res} from '@nestjs/common';
import { FellowLeadService } from './fellow-lead.service';
import { query } from 'express';
import { Response } from 'express';


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
  async getUnassignment(@Request() req:any) {
 
   let query  = req.query;
 
   
    try {
      const leads = await this.fellowLeadService.getUnassignment(query);
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


  
  @Post('followup-reasons/add')
  async createFollowupReason(@Body() body: any, @Res() res: Response) {
    try {
      const result = await this.fellowLeadService.createFollowupReason(body);
      return res.status(HttpStatus.CREATED).send({
        status: true,
        message: 'Follow-up reason added successfully',
        data: result,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: false,
        message: `Failed to add follow-up reason: ${err.message}`,
        data: null,
      });
    }
  }

  @Post('followup-reasons/update')
  async updateFollowupReason(@Body() body: any, @Res() res: Response) {
    try {
      const result = await this.fellowLeadService.updateFollowupReason(body);
      return res.status(HttpStatus.OK).send({
        status: true,
        message: 'Follow-up reason updated successfully',
        data: result,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: false,
        message: `Failed to update follow-up reason: ${err.message}`,
        data: null,
      });
    }
  }


  @Post('followup-block/add')
  async addFollowupBlock(@Body() body: any, @Res() res: Response) {
    try {
      const result = await this.fellowLeadService.addFollowupBlock(body);
      return res.status(HttpStatus.OK).send({
        status: true,
        message: 'Blocked successfully',
        data: result,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: false,
        message: `Failed to update follow-up reason: ${err.message}`,
        data: null,
      });
    }
  }


  @Get('followup-block/list')
  async ListFollowupBlock(@Body() body: any, @Res() res: Response,@Param('type') type: number) {
    try {
      const result = await this.fellowLeadService.followupBlockList(type);
      return res.status(HttpStatus.OK).send({
        status: true,
        message: 'Data fetched successfully',
        data: result,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: false,
        message: `Failed to update follow-up reason: ${err.message}`,
        data: null,
      });
    }
  }

  @Get('followup-reasons/get/:id')
  async getByIdFollowupReason(@Param('id') id: number, @Res() res: Response) {
    try {
      const result = await this.fellowLeadService.getFollowupReasonById(id);
      return res.status(HttpStatus.OK).send({
        status: true,
        message: 'Follow-up reason fetched successfully',
        data: result,
      });
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).send({
        status: false,
        message: `Follow-up reason not found: ${err.message}`,
        data: null,
      });
    }
  }

  @Get('followup-reasons-all')
  async getAllFollowupReason(@Res() res: Response) {
    try {
      const result = await this.fellowLeadService.getAllFollowupReasons();
      return res.status(HttpStatus.OK).send({
        status: true,
        message: 'Follow-up reason list fetched successfully',
        data: result,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: false,
        message: `Failed to fetch follow-up reasons: ${err.message}`,
        data: null,
      });
    }
  }

  @Post('followup-reasons/delete/:id')
  async softDeleteFollowupReason(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.fellowLeadService.softDeleteFollowupReason(id);
      return res.status(HttpStatus.OK).send({
        status: true,
        message: 'Follow-up reason soft deleted successfully',
        data: null,
      });
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).send({
        status: false,
        message: `Failed to soft delete follow-up reason: ${err.message}`,
        data: null,
      });
    }
  }

  @Put('followup-reasons/status/:id')
  async updateStatusFollowupReason(@Param('id') id: number, @Body() body: { isActive: boolean }, @Res() res: Response) {
    try {
      const data = await this.fellowLeadService.toggleFollowupReasonStatus(id);
      return res.status(HttpStatus.OK).send({
        status: true,
        message: 'Follow-up reason status updated successfully',
        data: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: false,
        message: `Failed to update follow-up reason status: ${error.message}`,
        data: null,
      });
    }
  }
}
