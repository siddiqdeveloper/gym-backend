import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus,Req } from '@nestjs/common';

import { ChartsService } from './charts.service';
@Controller('charts')
export class ChartsController {
  constructor(private readonly chartsService: ChartsService) {}


  

  @Get('get-charts-data')
  async generateChartData(@Req() request: any) {
    try {
    
      const data = await this.chartsService.generateChartData(request.query);
      return {
        status: true,
        message: 'Data retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error)
      throw new HttpException({
        status: false,
        message: `Failed to retrieve data`,
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }
  

  @Get('current-month-followup')
  async findOne(@Param('id') id: number) {
    try {
      console.log('id',id)
      const data = await this.chartsService.currentMonthFollowup();
      return {
        status: true,
        message: 'Lead retrieved successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException({
        status: false,
        message: `Failed to retrieve lead with ID ${id}`,
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
