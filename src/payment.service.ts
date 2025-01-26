import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Payment } from './entities/Payment';
import { DuePaidPayment } from './entities/duePaidPayment.entity';
import { Lead } from './entities/Lead.entity';
import {Incentive} from "./entities/incentive.entity";
import {CashTopUp} from "./entities/cashtop.entity";

@Injectable()
export class PaymentService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(DuePaidPayment)
    private readonly duePaidPaymentRepository: Repository<DuePaidPayment>,
    @InjectRepository(Incentive)
    private readonly incentiveRepository: Repository<Incentive>,
  ) {}

  async createPayment(createPaymentDto) {
    const payment = this.paymentRepository.create(createPaymentDto);
    console.log('payment',payment)
    return this.paymentRepository.save(payment);
  }

  async findAll() {
    // const result = await this.dataSource.query('CALL getAllPayments()');
    // console.log()
    // return result[0];
    return this.paymentRepository.find();
  }

  async updateStatus(id: any, isActive: boolean) {
    console.log(id);
    const payment: any = await this.paymentRepository.findOne({
      where: { id: id },
    });
    if (!payment) {
      throw new Error('payment not found');
    }

    payment.isActive = isActive ? 1 : 0;
    console.log(payment);
    return this.paymentRepository.save(payment);
  }
  async remove(id: any) {
    await this.paymentRepository.softDelete(id);
  }

  async updatepayments(body) {
    try {
      const updatePayments = await this.paymentRepository.update(
        { id: body.id },
        body,
      );
      return updatePayments;
    } catch (error) {
      console.error('Error updating updateReceivepayments', error);
      throw new Error('Failed to updating updateReceivepayments');
    }
  }

  async findOne(id) {
    const result = await this.dataSource.query(
      'CALL getPaymentData(?)', // Use parameterized query
      [id],
    );
    if (result && result[0] && result[0][0]) {
      return result[0][0];
    } else {
      throw new Error('No data found for this ID'); // Handle no data case
    }
  }

  async getupdatePayments(body: any) {
    console.log('body', body);
    const details: any = await this.paymentRepository.findOne({
      where: { memberId: body.memberid },
    });
    console.log('details', details);
    details.pendingAmount = body.pendingAmount;
    details.paidAmount = body.paidAmount;
    await this.paymentRepository.save(body);
  }

  //   due paidPayment Save

  async createduePaidPayment(body) {
    console.log('Body to save:', body);
    try {
      const details = await this.duePaidPaymentRepository.save(body);
      const paymentData = await this.paymentRepository.findOne({
        where: { id: details.paymentId },
      });

      if (paymentData) {
        console.log('paymentData:', paymentData);

        const paidAmount = parseFloat(paymentData.paidAmount) || 0;
        const pendingAmount = parseFloat(details.pendingAmount) || 0;
        const totalAmount = parseFloat(paymentData.totalAmount) || 0;

        paymentData.paidAmount = (paidAmount + pendingAmount).toString();

        if (paidAmount + pendingAmount >= totalAmount) {
          paymentData.pendingAmount = 0;
        } else {
          paymentData.pendingAmount =
            totalAmount - (paidAmount + pendingAmount);
        }

        await this.paymentRepository.save(paymentData);
        return body;
      } else {
        throw new Error('Payment not found.');
      }
    } catch (error) {
      console.error('Error saving duePaidPayment:', error.message);
      throw new Error(`Failed to save duePaidPayment: ${error.message}`);
    }
  }

  async transaction(customStartDate, customEndDate, selectedTrainer) {
    customStartDate = "'" + customStartDate + "'";
    customEndDate = "'" + customEndDate + "'";
    selectedTrainer = "'" + selectedTrainer + "'";
    const result = await this.dataSource.query(
      'Call gettransactionTodayList(' +
        customStartDate +
        ',' +
        customEndDate +
        ',' +
        selectedTrainer +
        ')',
      [],
    );
    if (result) {
      const data = result[0];
      return data;
    }
  }

  async weekcollection(customStartDate, customEndDate, selectedTrainer) {
    customStartDate = "'" + customStartDate + "'";
    customEndDate = "'" + customEndDate + "'";
    selectedTrainer = "'" + selectedTrainer + "'";
    const result = await this.dataSource.query(
      'Call gettransactionweekcollection(' +
        customStartDate +
        ',' +
        customEndDate +
        ',' +
        selectedTrainer +
        ')',
      [],
    );
    if (result) {
      const data = result[0];
      return data;
    }
  }

  async cashcollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getcashcollection()');
    console.log();
    return result[0];
  }

  async duesummary(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getDueSummary()');
    console.log();
    return result[0];
  }

  async monthcollection(customStartDate, customEndDate, selectedTrainer) {
    customStartDate = "'" + customStartDate + "'";
    customEndDate = "'" + customEndDate + "'";
    selectedTrainer = "'" + selectedTrainer + "'";
    const result = await this.dataSource.query(
      'Call getmonthcollection(' +
        customStartDate +
        ',' +
        customEndDate +
        ',' +
        selectedTrainer +
        ')',
      [],
    );
    if (result) {
      const data = result[0];
      return data;
    }
  }

  async upicollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getUPICollection()');
    console.log();
    return result[0];
  }

  async trainerwise(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL gettrainerwise()');
    console.log();
    return result[0];
  }

  async maleMember(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getmaleMember()');
    console.log();
    return result[0];
  }

  async femaleMember(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getfemaleMember()');
    console.log();
    return result[0];
  }

  async annualSales(customStartDate, customEndDate, selectedTrainer) {
    customStartDate = "'" + customStartDate + "'";
    customEndDate = "'" + customEndDate + "'";
    selectedTrainer = "'" + selectedTrainer + "'";
    const result = await this.dataSource.query(
      'Call getannualSales(' +
        customStartDate +
        ',' +
        customEndDate +
        ',' +
        selectedTrainer +
        ')',
      [],
    );
    if (result) {
      const data = result[0];
      return data;
    }
  }

  async topSelling(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL gettopSelling()');
    console.log();
    return result[0];
  }

  async lowSelling(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getlowSelling()');
    console.log();
    return result[0];
  }

  async branchWise(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getbranchWise()');
    console.log();
    return result[0];
  }

  async collection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getcollection()');
    console.log();
    return result[0];
  }

  async paymentdiscount(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getpaymentdiscount()');
    console.log();
    return result[0];
  }

  async packagecomplementary(): Promise<Lead[]> {
    const result = await this.dataSource.query(
      'CALL getpackagecomplementary()',
    );
    console.log();
    return result[0];
  }

  async packageoffer(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getpackageoffer()');
    console.log();
    return result[0];
  }

  async paymentrenewal(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getpaymentrenewal()');
    console.log();
    return result[0];
  }

  async paymentrefund(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getpaymentrefund()');
    console.log();
    return result[0];
  }

  async halfOfYearMember(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL gethalfOfYearMember()');
    console.log();
    return result[0];
  }

  async quaterlymember(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getquaterlymember()');
    console.log();
    return result[0];
  }

  async AllTodayCollection() {
    const result = await this.dataSource.query('CALL getAllTodayCollection()');
    console.log();
    return result[0];
  }

  async AllWeekCollection() {
    const result = await this.dataSource.query('CALL getAllWeekCollection()');
    console.log();
    return result[0];
  }

  async Allcashcollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getcashcollection()');
    console.log();
    return result[0];
  }

  async allDueSummary(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getDueSummary()');
    console.log();
    return result[0];
  }

  async allMonthList(): Promise<Lead[]> {
    const result = await this.dataSource.query(
      'CALL getAllMonthCollectionData()',
    );
    console.log();
    return result[0];
  }

  async allUpiList(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getUPICollection()');
    console.log();
    return result[0];
  }

  async getALlMaleMember(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getmaleMember()');
    console.log();
    return result[0];
  }

  async getALlFemaleMember(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getfemaleMember()');
    console.log();
    return result[0];
  }

  async getALlAnnualSales(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getAllAnnualSalesList()');
    console.log();
    return result[0];
  }

  async getALlTopSelling(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL gettopSelling()');
    console.log();
    return result[0];
  }

  async getALlLowSelling(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getlowSelling()');
    console.log();
    return result[0];
  }

  async getALlbranchwish(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getbranchWise()');
    console.log();
    return result[0];
  }

  async getALlCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getcollection()');
    console.log();
    return result[0];
  }

  async getAllPaymentDiscount(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getpaymentdiscount()');
    console.log();
    return result[0];
  }

  async getALlPackageComplementary(): Promise<Lead[]> {
    const result = await this.dataSource.query(
      'CALL getpackagecomplementary()',
    );
    console.log();
    return result[0];
  }

  async getAllPackageOffer(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getpackageoffer()');
    console.log();
    return result[0];
  }

  async getAllPaymentRenewal(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getpaymentrenewal()');
    console.log();
    return result[0];
  }

  async getAllPaymentRefund(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getpaymentrefund()');
    console.log();
    return result[0];
  }

  async getAllHalfOfYearMember(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL gethalfOfYearMember()');
    console.log();
    return result[0];
  }

  async getAllQuaterlyMemberS(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getquaterlymember()');
    console.log();
    return result[0];
  }

  //   transaction Dashboard

  // async transactionDashboard() {
  //   const result = await this.dataSource.query(
  //     'CALL gettransactionDashboard()',
  //   );
  //   console.log();
  //   const details = result[0];
  //    details.weeklyCollection = result[1];
  //   return details;
  // }

  async transactionDashboard() {
    const result = await this.dataSource.query('CALL gettransactionDashboard()');

    // The result array will contain both result sets:
    const details = {
      total_todayCollection: result[0][0]?.total_todayCollection || 0,
      total_weeklyCollection: result[1][0]?.total_weeklyCollection || 0,
      total_cashCollection: result[2][0]?.total_cashCollection || 0,
      total_monthly: result[3][0]?.total_monthly || 0,
      total_upi: result[4][0]?.total_upi || 0,
      total_due: result[5][0]?.total_due || 0,
      total_cardCollection: result[6][0]?.total_cardCollection || 0,
    };

    return details;
  }


  async cardcollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getcardcollection()');
    console.log();
    return result[0];
  }


  async Allcardcollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getcardcollection()');
    console.log();
    return result[0];
  }


  async annualMember(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getannualMember()');
    console.log();
    return result[0];
  }


  async getAllAnnualList(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getannualMember()');
    console.log();
    return result[0];
  }


  async splitcollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getsplitcollection()');
    console.log();
    return result[0];
  }


  async getAllSplitList(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getsplitcollection()');
    console.log();
    return result[0];
  }


  async getTodayCashCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getTodayCashCollection()');
    console.log();
    return result[0][0];
  }


  async getWeekCashCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getWeekCashCollection()');
    console.log();
    return result[0][0];
  }


  async getMonthCashCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getMonthCashCollection()');
    console.log();
    return result[0][0];
  }



  async getTodayweeklyCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getTodayweeklyCollection()');
    console.log();
    return result[0][0];
  }


  async getWeekWeeklyCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getWeekWeeklyCollection()');
    console.log();
    return result[0][0];
  }


  async getCashWeeklyCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getCashWeeklyCollection()');
    console.log();
    return result[0][0];
  }



  async getTodayupiCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getTodayupiCollection()');
    console.log();
    return result[0][0];
  }


  async getWeekupiCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getWeekupiCollection()');
    console.log();
    return result[0][0];
  }


  async getMonthupiCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getMonthupiCollection()');
    console.log();
    return result[0][0];
  }



  async getTodayCardCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getTodayCardCollection()');
    console.log();
    return result[0][0];
  }



  async getMonthCardCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getMonthCardCollection()');
    console.log();
    return result[0][0];
  }

  async getCardTodayCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getCardTodayCollection()');
    console.log();
    return result[0][0];
  }



  async getUpiTodayCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getUpiTodayCollection()');
    console.log();
    return result[0][0];
  }


  async getCashTodayCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getCashTodayCollection()');
    console.log();
    return result[0][0];
  }



  async getsplitTodayCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getsplitTodayCollection()');
    console.log();
    return result[0][0];
  }

  async getsplitWeeklyCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getsplitWeeklyCollection()');
    console.log();
    return result[0][0];
  }


  async getsplitMonthlyCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getsplitMonthlyCollection()');
    console.log();
    return result[0][0];
  }



  async getUpiDatainTodayCollections(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getUpiDatainTodayCollections()');
    console.log();
    return result[0][0];
  }


  async getMonthDatainReportList(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getMonthDatainReportList()');
    console.log();
    return result[0][0];
  }





//   monthly collection

  async getUpiMonthlyCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getUpiMonthlyCollection()');
    console.log();
    return result[0][0];
  }


  async getcashMonthlyCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getcashMonthlyCollection()');
    console.log();
    return result[0][0];
  }


  async getCardMonthlyCollection(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL getCardMonthlyCollection()');
    console.log();
    return result[0][0];
  }


  async incentivefindAll(): Promise<CashTopUp[]> {
    const result = await this.dataSource.query('CALL getincentivefindAll()');
    return result[0];
  }
}
