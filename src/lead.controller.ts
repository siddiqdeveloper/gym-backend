import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { LeadService } from './lead.service';
@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  async create(@Body() leadData) {
    try {
      const data = await this.leadService.create(leadData);
      return {
        status: true,
        message: 'Lead created successfully',
        data: data,
      };
    } catch (error) {
      console.log(error)
      throw new HttpException({
        status: false,
        message: 'Failed to create lead',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('all')
  async findAll() {
    try {
      const data = await this.leadService.findAll();
      return {
        status: true,
        message: 'Leads retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error)
      throw new HttpException({
        status: false,
        message: 'Failed to retrieve leads',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get/:id')
  async findOne(@Param('id') id: number) {
    try {
      console.log('id',id)
      const data = await this.leadService.findOne(id);
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

  @Put('update/:id')
  async update(@Param('id') id: number, @Body() leadData) {
    try {
      const data = await this.leadService.update(id, leadData);
      return {
        status: true,
        message: 'Lead updated successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException({
        status: false,
        message: `Failed to update lead with ID ${id}`,
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number) {
    try {
      await this.leadService.remove(id);
      return {
        status: true,
        message: 'Lead deleted successfully',
      };
    } catch (error) {
      throw new HttpException({
        status: false,
        message: `Failed to delete lead with ID ${id}`,
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }



  @Put('leadstatus/:id')
  async updateLeadStatus(@Param('id') id: string, @Body() body: { isActive: boolean }) {
    try {
      const data = await this.leadService.updateLeadStatus(id, body.isActive);
      return {
        status: true,
        message: 'Lead status updated successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error updating lead status:', error);
      throw new HttpException({
        status: false,
        message: 'Failed to update Lead status',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }




}
