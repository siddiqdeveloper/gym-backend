import { Controller, Post, Body, HttpException, HttpStatus,Get, Put, Param, Delete, Res, Req } from '@nestjs/common';
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


  // update 

  @Post('update/payment')
  async updatePayments(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.paymentService.updatePayments(body);
      return {
          status: true,
          message: 'Payment Updated successfully',
          data: check,
      };
      
    } catch (error) {
      console.log(error)  
      throw new HttpException({
          status: false,
          message: 'Failed to Payment',
          error: error.message,
      }, HttpStatus.BAD_REQUEST)

     
    }
  }




  @Get('get/:id')
  async findOne(@Param('id') id: number) {
      console.log('Received ID:', id); // Log the ID
      try {
          const data = await this.paymentService.findOne(id);
          console.log('Data Retrieved:', data); // Log the retrieved data
          return {
              status: true,
              message: 'Payment retrieved successfully',
              data: data,
          };
      } catch (error) {
          console.error('Error retrieving Payment:', error);
          throw new HttpException({
              status: false,
              message: 'Failed to retrieve Payment',
              error: error.message,
          }, HttpStatus.BAD_REQUEST);
      }
  }
  


}
