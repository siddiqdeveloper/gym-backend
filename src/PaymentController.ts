import { Controller, Post, Body, HttpException, HttpStatus,Get, Put, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Body() body) {
    try {
      const data = await this.paymentService.createPayment(body);
      return {
        status: true,
        message: 'Payment created successfully',
        data,
      };
    } catch (error) {
      console.error(error); // Log the error for debugging
      throw new HttpException({
        status: false,
        message: 'Failed to create payment',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('all')
  async findAll() {
    try {
      const data = await this.paymentService.findAll();
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


  @Put('status/:id')
  async updateStatus(@Param('id') id: string, @Body() body: { isActive: boolean }) {
    try {
      const data = await this.paymentService.updateStatus(id, body.isActive);
      return {
        status: true,
        message: 'Payment status updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error)
      throw new HttpException({
        status: false,
        message: 'Failed to update Payment status',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      await this.paymentService.remove(+id);
      return {
        status: true,
        message: 'Payments deleted successfully',
      };
    } catch (error) {
      throw new HttpException({
        status: false,
        message: 'Failed to delete Payments',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
