import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { FellowLeadService } from './fellow-lead.service';
import { FellowLead } from './fellow-lead.entity';

@Controller('fellow-leads')
export class FellowLeadController {
  constructor(private readonly fellowLeadService: FellowLeadService) {}

  // Fetch fellow leads by a specific date
  @Get('by-date')
  async getFellowLeadsByDate(@Query('date') date: string) {
    const searchDate = new Date(date);
    
    if (isNaN(searchDate.getTime())) {
      throw new HttpException('Invalid date format', HttpStatus.BAD_REQUEST); // Improved error handling
    }

    try {
      const leads = await this.fellowLeadService.findByDate(searchDate);
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
}
