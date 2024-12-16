import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Put,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Response } from 'express';

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
      throw new HttpException(
        {
          status: false,
          message: 'Failed to create payment',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
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
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve leads',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    try {
      const data = await this.paymentService.updateStatus(id, body.isActive);
      return {
        status: true,
        message: 'Payment status updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to update Payment status',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
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
      throw new HttpException(
        {
          status: false,
          message: 'Failed to delete Payments',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // update

  @Post('payments/update')
  async updatepayments(
    @Body() body,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    try {
      const check = await this.paymentService.updatepayments(body);
      return {
        status: true,
        message: 'payments Updated successfully',
        data: check,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to Receive payments',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
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
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Payment',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('getupdatePayments')
  async getupdatePayments(@Body() body) {
    try {
      const data = await this.paymentService.getupdatePayments(body);
      return {
        status: true,
        message: 'Payment Updated  successfully',
        data,
      };
    } catch (error) {
      console.error(error); // Log the error for debugging
      throw new HttpException(
        {
          status: false,
          message: 'Failed to create payment',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   save duePaidPayments

  @Post('duePaidPayment/save')
  async createduePaidPayment(@Body() body) {
    try {
      const data = await this.paymentService.createduePaidPayment(body);
      return {
        status: true,
        message: 'DuePaidPayment created successfully',
        data,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to create DuePaidPayment',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //

  @Post('transaction/todaycollection')
  async transaction(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.transaction(
      body.customStartDate,
      body.customEndDate,
      body.selectedTrainer,
    );

    res.send(data);
  }

  @Post('transaction/weekcollection')
  async weekcollection(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.weekcollection(
      body.customStartDate,
      body.customEndDate,
      body.selectedTrainer,
    );

    res.send(data);
  }

  @Post('transaction/cashcollection')
  async cashcollection(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.cashcollection();

    res.send(data);
  }

  @Post('transaction/duesummary')
  async duesummary(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.duesummary();

    res.send(data);
  }

  @Post('transaction/monthcollection')
  async monthcollection(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.monthcollection(
      body.customStartDate,
      body.customEndDate,
      body.selectedTrainer,
    );

    res.send(data);
  }

  @Post('transaction/upicollection')
  async upicollection(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.upicollection();

    res.send(data);
  }

  @Post('trainerwise/report')
  async trainerwise(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.trainerwise();

    res.send(data);
  }

  @Post('maleMember/report')
  async maleMember(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.maleMember();

    res.send(data);
  }

  @Post('femaleMember/report')
  async femaleMember(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.femaleMember();

    res.send(data);
  }

  @Post('annualSales/reports')
  async annualSales(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.annualSales(
      body.customStartDate,
      body.customEndDate,
      body.selectedTrainer,
    );

    res.send(data);
  }

  @Post('topSelling/report')
  async topSelling(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.topSelling();

    res.send(data);
  }

  @Post('lowSelling/report')
  async lowSelling(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.lowSelling();

    res.send(data);
  }

  @Post('branchWise/report')
  async branchWise(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.branchWise();

    res.send(data);
  }

  @Post('collection/report')
  async collection(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.collection();

    res.send(data);
  }

  @Post('paymentdiscount/report')
  async paymentdiscount(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.paymentdiscount();

    res.send(data);
  }

  @Post('packagecomplementary/report')
  async packagecomplementary(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.packagecomplementary();

    res.send(data);
  }

  @Post('packageoffer/report')
  async packageoffer(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.packageoffer();

    res.send(data);
  }

  @Post('paymentrenewal/report')
  async paymentrenewal(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.paymentrenewal();

    res.send(data);
  }

  @Post('paymentrefund/report')
  async paymentrefund(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.paymentrefund();

    res.send(data);
  }

  @Post('halfOfYearMember/report')
  async halfOfYearMember(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.halfOfYearMember();

    res.send(data);
  }

  @Post('quaterlymember/report')
  async quaterlymember(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.quaterlymember();

    res.send(data);
  }

  @Get('AllTodayCollection')
  async AllTodayCollection() {
    try {
      const data = await this.paymentService.AllTodayCollection();
      return {
        status: true,
        message: 'AllTodayCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve AllTodayCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('AllTodayCollection')
  async AllWeekCollection() {
    try {
      const data = await this.paymentService.AllWeekCollection();
      return {
        status: true,
        message: 'AllWeekCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve AllWeekCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('Allcashcollection')
  async Allcashcollection() {
    try {
      const data = await this.paymentService.Allcashcollection();
      return {
        status: true,
        message: 'Allcashcollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Allcashcollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }



  @Get('allDueSummary')
  async allDueSummary() {
    try {
      const data = await this.paymentService.allDueSummary();
      return {
        status: true,
        message: 'AllDueSummary retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
          {
            status: false,
            message: 'Failed to retrieve AllDueSummary',
            error: error.message,
          },
          HttpStatus.BAD_REQUEST,
      );
    }
  }


  @Get('allMonthList')
  async allMonthList() {
    try {
      const data = await this.paymentService.allMonthList();
      return {
        status: true,
        message: 'allMonthList retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
          {
            status: false,
            message: 'Failed to retrieve allMonthList',
            error: error.message,
          },
          HttpStatus.BAD_REQUEST,
      );
    }
  }



  @Get('allUpiList')
  async allUpiList() {
    try {
      const data = await this.paymentService.allUpiList();
      return {
        status: true,
        message: 'allUpiList retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
          {
            status: false,
            message: 'Failed to retrieve allUpiList',
            error: error.message,
          },
          HttpStatus.BAD_REQUEST,
      );
    }
  }
}
