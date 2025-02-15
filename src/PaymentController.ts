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

  @Post('update')
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

  @Get('getALlMaleMember')
  async getALlMaleMember() {
    try {
      const data = await this.paymentService.getALlMaleMember();
      return {
        status: true,
        message: 'getALlMaleMember retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'getALlMaleMember to retrieve getALlMaleMember',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getALlFemaleMember')
  async getALlFemaleMember() {
    try {
      const data = await this.paymentService.getALlFemaleMember();
      return {
        status: true,
        message: 'getALlFemaleMember retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'getALlMaleMember to retrieve getALlFemaleMember',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getALlAnnualSales')
  async getALlAnnualSales() {
    try {
      const data = await this.paymentService.getALlAnnualSales();
      return {
        status: true,
        message: 'getALlAnnualSales retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'getALlMaleMember to retrieve getALlAnnualSales',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getALlTopSelling')
  async getALlTopSelling() {
    try {
      const data = await this.paymentService.getALlTopSelling();
      return {
        status: true,
        message: 'getALlTopSelling retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'getALlMaleMember to retrieve getALlTopSelling',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getALlLowSelling')
  async getALlLowSelling() {
    try {
      const data = await this.paymentService.getALlLowSelling();
      return {
        status: true,
        message: 'getALlLowSelling retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'getALlMaleMember to retrieve getALlLowSelling',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getALlbranchwish')
  async getALlbranchwish() {
    try {
      const data = await this.paymentService.getALlbranchwish();
      return {
        status: true,
        message: 'getALlbranchwish retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'getALlMaleMember to retrieve getALlbranchwish',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getALlCollection')
  async getALlCollection() {
    try {
      const data = await this.paymentService.getALlCollection();
      return {
        status: true,
        message: 'getALlCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'getALlMaleMember to retrieve getALlCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getAllPaymentDiscount')
  async getAllPaymentDiscount() {
    try {
      const data = await this.paymentService.getAllPaymentDiscount();
      return {
        status: true,
        message: 'getAllPaymentDiscount retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'getALlMaleMember to retrieve getAllPaymentDiscount',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getALlPackageComplementary')
  async getALlPackageComplementary() {
    try {
      const data = await this.paymentService.getALlPackageComplementary();
      return {
        status: true,
        message: 'getALlPackageComplementary retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message:
            'getALlPackageComplementary to retrieve getALlPackageComplementary',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getAllPackageOffer')
  async getAllPackageOffer() {
    try {
      const data = await this.paymentService.getAllPackageOffer();
      return {
        status: true,
        message: 'getAllPackageOffer retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'getAllPackageOffer to retrieve getAllPackageOffer',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getAllPaymentRenewal')
  async getAllPaymentRenewal() {
    try {
      const data = await this.paymentService.getAllPaymentRenewal();
      return {
        status: true,
        message: 'getAllPaymentRenewal retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'getAllPaymentRenewal to retrieve getAllPaymentRenewal',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getAllPaymentRefund')
  async getAllPaymentRefund() {
    try {
      const data = await this.paymentService.getAllPaymentRefund();
      return {
        status: true,
        message: 'getAllPaymentRefund retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'getAllPaymentRefund to retrieve getAllPaymentRefund',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getAllHalfOfYearMember')
  async getAllHalfOfYearMember() {
    try {
      const data = await this.paymentService.getAllHalfOfYearMember();
      return {
        status: true,
        message: 'getAllHalfOfYearMember retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'getAllHalfOfYearMember to retrieve getAllHalfOfYearMember',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getAllQuaterlyMemberS')
  async getAllQuaterlyMemberS() {
    try {
      const data = await this.paymentService.getAllQuaterlyMemberS();
      return {
        status: true,
        message: 'getAllQuaterlyMemberS retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'getAllQuaterlyMemberS to retrieve getAllQuaterlyMemberS',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   transaction Dashboard

  @Get('transaction/get')
  async transactionDashboard() {
    try {
      const data = await this.paymentService.transactionDashboard();
      return {
        status: true,
        message: 'transactionDashboard retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve transactionDashboard',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('transaction/cardcollection')
  async cardcollection(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.cardcollection();

    res.send(data);
  }

  @Get('Allcardcollection')
  async Allcardcollection() {
    try {
      const data = await this.paymentService.Allcardcollection();
      return {
        status: true,
        message: 'Allcardcollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Allcardcollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('annualMember/report')
  async annualMember(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.annualMember();

    res.send(data);
  }

  @Get('getAllAnnualList')
  async getAllAnnualList() {
    try {
      const data = await this.paymentService.getAllAnnualList();
      return {
        status: true,
        message: 'Allcardcollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve Allcardcollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('splitcollection/report')
  async splitcollection(
    @Body() body,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    console.log('ywhb', body);
    const data = await this.paymentService.splitcollection();

    res.send(data);
  }

  @Get('getAllSplitList')
  async getAllSplitList() {
    try {
      const data = await this.paymentService.getAllSplitList();
      return {
        status: true,
        message: 'getAllSplitList retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getAllSplitList',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   today cashCollection

  @Get('getTodayCashCollection')
  async getTodayCashCollection() {
    try {
      const data = await this.paymentService.getTodayCashCollection();
      return {
        status: true,
        message: 'getTodayCashCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getTodayCashCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getWeekCashCollection')
  async getWeekCashCollection() {
    try {
      const data = await this.paymentService.getWeekCashCollection();
      return {
        status: true,
        message: 'getWeekCashCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getWeekCashCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getMonthCashCollection')
  async getMonthCashCollection() {
    try {
      const data = await this.paymentService.getMonthCashCollection();
      return {
        status: true,
        message: 'getMonthCashCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getMonthCashCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getTodayweeklyCollection')
  async getTodayweeklyCollection() {
    try {
      const data = await this.paymentService.getTodayweeklyCollection();
      return {
        status: true,
        message: 'getTodayweeklyCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getTodayweeklyCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getWeekWeeklyCollection')
  async getWeekWeeklyCollection() {
    try {
      const data = await this.paymentService.getWeekWeeklyCollection();
      return {
        status: true,
        message: 'getWeekWeeklyCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getWeekWeeklyCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getCashWeeklyCollection')
  async getCashWeeklyCollection() {
    try {
      const data = await this.paymentService.getCashWeeklyCollection();
      return {
        status: true,
        message: 'getCashWeeklyCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getCashWeeklyCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getTodayupiCollection')
  async getTodayupiCollection() {
    try {
      const data = await this.paymentService.getTodayupiCollection();
      return {
        status: true,
        message: 'getTodayupiCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getTodayupiCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getWeekupiCollection')
  async getWeekupiCollection() {
    try {
      const data = await this.paymentService.getWeekupiCollection();
      return {
        status: true,
        message: 'getWeekupiCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getWeekupiCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getMonthupiCollection')
  async getMonthupiCollection() {
    try {
      const data = await this.paymentService.getMonthupiCollection();
      return {
        status: true,
        message: 'getMonthupiCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getMonthupiCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getTodayCardCollection')
  async getTodayCardCollection() {
    try {
      const data = await this.paymentService.getTodayCardCollection();
      return {
        status: true,
        message: 'getTodayCardCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getTodayCardCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getMonthCardCollection')
  async getMonthCardCollection() {
    try {
      const data = await this.paymentService.getMonthCardCollection();
      return {
        status: true,
        message: 'getMonthCardCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getMonthCardCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getUpiTodayCollection')
  async getUpiTodayCollection() {
    try {
      const data = await this.paymentService.getUpiTodayCollection();
      return {
        status: true,
        message: 'getUpiTodayCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getUpiTodayCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getCardTodayCollection')
  async getCardTodayCollection() {
    try {
      const data = await this.paymentService.getCardTodayCollection();
      return {
        status: true,
        message: 'getCardTodayCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getCardTodayCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getCashTodayCollection')
  async getCashTodayCollection() {
    try {
      const data = await this.paymentService.getCashTodayCollection();
      return {
        status: true,
        message: 'getCashTodayCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getCashTodayCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getsplitTodayCollection')
  async getsplitTodayCollection() {
    try {
      const data = await this.paymentService.getsplitTodayCollection();
      return {
        status: true,
        message: 'getsplitTodayCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getsplitTodayCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getsplitWeeklyCollection')
  async getsplitWeeklyCollection() {
    try {
      const data = await this.paymentService.getsplitWeeklyCollection();
      return {
        status: true,
        message: 'getsplitWeeklyCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getsplitWeeklyCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getsplitMonthlyCollection')
  async getsplitMonthlyCollection() {
    try {
      const data = await this.paymentService.getsplitMonthlyCollection();
      return {
        status: true,
        message: 'getsplitMonthlyCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getsplitMonthlyCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getUpiDatainTodayCollections')
  async getUpiDatainTodayCollections() {
    try {
      const data = await this.paymentService.getUpiDatainTodayCollections();
      return {
        status: true,
        message: 'getUpiDatainTodayCollections retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getUpiDatainTodayCollections',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getMonthDatainReportList')
  async getMonthDatainReportList() {
    try {
      const data = await this.paymentService.getMonthDatainReportList();
      return {
        status: true,
        message: 'getMonthDatainReportList retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getMonthDatainReportList',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //   monthly collection

  @Get('getUpiMonthlyCollection')
  async getUpiMonthlyCollection() {
    try {
      const data = await this.paymentService.getUpiMonthlyCollection();
      return {
        status: true,
        message: 'getUpiMonthlyCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getUpiMonthlyCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getcashMonthlyCollection')
  async getcashMonthlyCollection() {
    try {
      const data = await this.paymentService.getcashMonthlyCollection();
      return {
        status: true,
        message: 'getcashMonthlyCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getcashMonthlyCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getCardMonthlyCollection')
  async getCardMonthlyCollection() {
    try {
      const data = await this.paymentService.getCardMonthlyCollection();
      return {
        status: true,
        message: 'getCardMonthlyCollection retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: false,
          message: 'Failed to retrieve getCardMonthlyCollection',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  @Get('incentive')
  async incentivefindAll() {
    try {
      const data = await this.paymentService.incentivefindAll();
      return {
        status: true,
        message: 'Incentive retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
          {
            status: false,
            message: 'Failed to retrieve Incentive',
            error: error.message,
          },
          HttpStatus.BAD_REQUEST,
      );
    }
  }



//   update Due Payment

  @Post('duePaidPayment/update')
  async updateduePaidPayment(@Body() body) {
    try {
      const data = await this.paymentService.updateduePaidPayment(body);
      return {
        status: true,
        message: 'DuePaidPayment Update successfully',
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
}
