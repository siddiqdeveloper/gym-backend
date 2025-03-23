import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import puppeteer from 'puppeteer';
import { CheckList } from 'src/entities/checkList.entity';

import { ElectricityConsumption } from 'src/entities/electricityConsumption.entity';
import { Exercise } from 'src/entities/exercise.entity';
import { Reminder } from 'src/entities/reminder.entity';
import { ServiceLog } from 'src/entities/servicelog.entity';
import { WaterConsumption } from 'src/entities/waterConsumption.entity';
import { WorkOutType } from 'src/entities/workOutType.entity';
import { DataSource } from 'typeorm';
import * as twig from 'twig';

import { Freeze } from 'src/entities/freeze.entity';
import { Member } from 'src/entities/Member.entity';
import { Repository } from 'typeorm';
import { Gst } from 'src/entities/gst.entity';
import { PettyCash } from 'src/entities/pettyCash.entity';
import { BankDetails } from 'src/entities/bankDetails.entity';
import { BranchDetails } from 'src/entities/branchDetails.entity';
import { Expense } from '../entities/expense.entity';
import { ReceivePayment } from '../entities/receive_payment,entity';
import { Withdraw } from '../entities/withDraw.entity';
import { Topup } from '../entities/topup.entity';

import * as path from 'path';
import * as fs from 'fs';
import * as XLSX from 'xlsx';
import { BulkUpload } from '../entities/bulkUpload.entity';
import { BulkUploadMeta } from '../entities/bulkUploadMeta.entity';
import { CashTopUp } from '../entities/cashtop.entity';
import { Withdrawal } from '../entities/withdrawal.entity';
import { Asset } from '../entities/assets.entity';
import { FeedBack } from '../entities/feedBack.entity';
import { FreeProgram } from '../entities/freeProgram.entity';
import { PaymentType } from '../entities/paymentType.entity';
import { Salary } from '../entities/salary.entity';
import { Setting } from '../entities/setting.entity';
import { AssignManager } from '../entities/assignManager.entity';
import { StaffPerformance } from "../entities/staffperfomance.entity";
import {StaffPerformanceMeta} from "../entities/staffPerformanceMeta,entity";

@Injectable()
export class MiscService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(ElectricityConsumption)
    private electricityConsumptionRepository: Repository<ElectricityConsumption>,
    @InjectRepository(WaterConsumption)
    private waterConsumptionRepository: Repository<WaterConsumption>,
    @InjectRepository(ServiceLog)
    private serviceLogRepository: Repository<ServiceLog>,
    @InjectRepository(Reminder)
    private reminderRepository: Repository<Reminder>,
    @InjectRepository(CheckList)
    private checkListRepository: Repository<CheckList>,
    @InjectRepository(WorkOutType)
    private workOutTypeRepository: Repository<WorkOutType>,
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    @InjectRepository(Freeze)
    private freezeRepository: Repository<Freeze>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(Gst)
    private gstRepository: Repository<Gst>,
    @InjectRepository(PettyCash)
    private pettyCashRepository: Repository<PettyCash>,
    @InjectRepository(BankDetails)
    private bankDetailsRepository: Repository<BankDetails>,
    @InjectRepository(BranchDetails)
    private branchDetailsRepository: Repository<BranchDetails>,
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    @InjectRepository(ReceivePayment)
    private receivePaymentRepository: Repository<ReceivePayment>,
    @InjectRepository(Withdraw)
    private withdrawRepository: Repository<Withdraw>,
    @InjectRepository(Topup)
    private topupRepository: Repository<Topup>,
    @InjectRepository(BulkUpload)
    private bulkUploadRepository: Repository<BulkUpload>,
    @InjectRepository(BulkUploadMeta)
    private bulkUploadMetaRepository: Repository<BulkUploadMeta>,
    @InjectRepository(CashTopUp)
    private cashTopUpRepository: Repository<CashTopUp>,
    @InjectRepository(Withdrawal)
    private withdrawalRepository: Repository<Withdrawal>,
    @InjectRepository(Asset)
    private assetRepository: Repository<Asset>,
    @InjectRepository(FeedBack)
    private feedBackRepository: Repository<FeedBack>,
    @InjectRepository(FreeProgram)
    private freeProgramRepository: Repository<FreeProgram>,
    @InjectRepository(PaymentType)
    private paymentTypeRepository: Repository<PaymentType>,
    @InjectRepository(Salary)
    private salaryRepository: Repository<Salary>,
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>,
    @InjectRepository(AssignManager)
    private assignManagerRepository: Repository<AssignManager>,
    @InjectRepository(StaffPerformance)
    private staffPerformanceRepository: Repository<StaffPerformance>,
    @InjectRepository(StaffPerformanceMeta)
    private staffPerformanceMetaRepository: Repository<StaffPerformanceMeta>,
  ) {}

  // electricity Consumption

  async saveElectricityConsumption(body) {
    try {
      if (body.startDate) {
        body.startDate = new Date(body.startDate).toISOString().slice(0, 10);
      }
      if (body.endDate) {
        body.endDate = new Date(body.endDate).toISOString().slice(0, 10);
      }
      await this.electricityConsumptionRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving electricity consumption', error);
      throw new Error('Failed to save electricity consumption');
    }
  }

  async updateMeter(body) {
    try {
      const updatemeter = await this.electricityConsumptionRepository.update(
        { id: body.id },
        body,
      );
      return updatemeter;
    } catch (error) {
      console.error('Error updating electricity consumption', error);
      throw new Error('Failed to updating electricity consumption');
    }
  }

  async meterfindOne(id: number): Promise<ElectricityConsumption> {
    return await this.electricityConsumptionRepository.findOne({
      where: { id },
    });
  }

  //  manage page data shows

  async meterReadingfindAll(): Promise<ElectricityConsumption[]> {
    const result = await this.dataSource.query(
      'CALL get_all_electricityConsumption()',
    );

    return result[0];
  }

  //  delete

  async removeMeter(id: number): Promise<void> {
    await this.electricityConsumptionRepository.delete(id);
  }

  // status

  async updateStatus(id: any, isActive: boolean) {
    console.log(id);
    const meter: any = await this.electricityConsumptionRepository.findOne({
      where: { id: id },
    });
    if (!meter) {
      throw new Error('meter not found');
    }

    meter.isActive = isActive ? 1 : 0;

    return this.electricityConsumptionRepository.save(meter);
  }

  //   water  Consumption

  async createWater(body) {
    try {
      if (body.data) {
        body.data = new Date(body.data).toISOString().slice(0, 10);
      }
      await this.waterConsumptionRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving Water consumption', error);
      throw new Error('Failed to save Water consumption');
    }
  }

  async updateWater(body) {
    try {
      const updateWater = await this.waterConsumptionRepository.update(
        { id: body.id },
        body,
      );
      return updateWater;
    } catch (error) {
      console.error('Error updating Water consumption', error);
      throw new Error('Failed to updating Water consumption');
    }
  }

  async waterfindOne(id: number): Promise<WaterConsumption> {
    return await this.waterConsumptionRepository.findOne({ where: { id } });
  }

  async waterfindAll(): Promise<WaterConsumption[]> {
    const result = await this.dataSource.query(
      'CALL get_all_waterConsumption()',
    );
    return result[0];
  }

  async removeWater(id: number): Promise<void> {
    await this.waterConsumptionRepository.delete(id);
  }

  // status

  async updateWaterStatus(id: any, isActive: boolean) {
    console.log(id);
    const water: any = await this.waterConsumptionRepository.findOne({
      where: { id: id },
    });
    if (!water) {
      throw new Error('meter not found');
    }

    water.isActive = isActive ? 1 : 0;

    return this.waterConsumptionRepository.save(water);
  }

  /////////////// service Log

  async createServiceLog(body) {
    try {
      if (body.datePosted) {
        body.datePosted = new Date(body.datePosted).toISOString().slice(0, 10);
      }
      if (body.estimatedDate) {
        body.estimatedDate = new Date(body.estimatedDate)
          .toISOString()
          .slice(0, 10);
      }
      if (body.actualRepairedOn) {
        body.actualRepairedOn = new Date(body.actualRepairedOn)
          .toISOString()
          .slice(0, 10);
      }
      await this.serviceLogRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving ServiceLog', error);
      throw new Error('Failed to save ServiceLog');
    }
  }

  async updateServiceLog(body) {
    try {
      const updateServiceLog = await this.serviceLogRepository.update(
        { id: body.id },
        body,
      );
      return updateServiceLog;
    } catch (error) {
      console.error('Error updating ServiceLog', error);
      throw new Error('Failed to updating ServiceLog');
    }
  }

  async serviceLogfindOne(id: number): Promise<ServiceLog> {
    return await this.serviceLogRepository.findOne({ where: { id } });
  }

  async serviceLogfindAll(): Promise<ServiceLog[]> {
    const result = await this.dataSource.query('CALL get_all_serviceLog()');
    return result[0];
  }

  async removeServiceLog(id: number): Promise<void> {
    await this.serviceLogRepository.delete(id);
  }

  // service

  async updateservicestatus(id: any, isActive: boolean) {
    console.log(id);
    const service: any = await this.serviceLogRepository.findOne({
      where: { id: id },
    });
    if (!service) {
      throw new Error('service not found');
    }

    service.isActive = isActive ? 1 : 0;

    return this.serviceLogRepository.save(service);
  }

  /////////////// reminder //////////////////

  async createReminder(body) {
    try {
      return await this.reminderRepository.save(body);
    } catch (error) {
      console.error('Error saving Reminder', error);
      throw new Error('Failed to save Reminder');
    }
  }

  async updateReminder(body) {
    try {
      const updateReminder = await this.reminderRepository.update(
        { id: body.id },
        body,
      );
      return updateReminder;
    } catch (error) {
      console.error('Error updating Reminder', error);
      throw new Error('Failed to updating Reminder');
    }
  }

  async reminderfindOne(id: number): Promise<Reminder> {
    return await this.reminderRepository.findOne({ where: { id } });
  }

  async reminderfindAll() {
    const result = await this.dataSource.query('CALL get_all_reminder()');
    return result[0];
  }

  async removeReminder(id: number): Promise<void> {
    await this.reminderRepository.delete(id);
  }

  // status

  async updatereminderstatus(id: any, isActive: boolean) {
    console.log(id);
    const reminder: any = await this.reminderRepository.findOne({
      where: { id: id },
    });
    if (!reminder) {
      throw new Error('reminder not found');
    }

    reminder.isActive = isActive ? 1 : 0;

    return this.reminderRepository.save(reminder);
  }

  //////////////checkList ////////////////////

  async createCheckList(body) {
    try {
      return await this.checkListRepository.save(body);
    } catch (error) {
      console.error('Error saving CheckList', error);
      throw new Error('Failed to save CheckList');
    }
  }

  async updateCheckList(body) {
    try {
      const updateCheckList = await this.checkListRepository.update(
        { id: body.id },
        body,
      );
      return updateCheckList;
    } catch (error) {
      console.error('Error updating CheckList', error);
      throw new Error('Failed to updating CheckList');
    }
  }

  async checkListfindOne(id: number): Promise<CheckList> {
    return await this.checkListRepository.findOne({ where: { id } });
  }

  async checkListfindAll(): Promise<CheckList[]> {
    const result = await this.dataSource.query('CALL get_all_checkList()');

    return result[0];
  }

  async removeCheckList(id: number): Promise<void> {
    await this.checkListRepository.delete(id);
  }

  async updatecheckListStatus(id: any, isActive: boolean) {
    const checkList: any = await this.checkListRepository.findOne({
      where: { id: id },
    });
    if (!checkList) {
      throw new Error('checkList not found');
    }

    checkList.isActive = isActive ? 1 : 0;

    return this.checkListRepository.save(checkList);
  }

  // workOutType

  async createWorkOutType(body) {
    try {
      await this.workOutTypeRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving WorkOutType', error);
      throw new Error('Failed to save WorkOutType');
    }
  }

  async updateWorkoutType(body) {
    try {
      const updateWorkOutType = await this.workOutTypeRepository.update(
        { id: body.id },
        body,
      );
      return updateWorkOutType;
    } catch (error) {
      console.error('Error updating WorkOutType', error);
      throw new Error('Failed to updating WorkOutType');
    }
  }

  async WorkoutTypefindOne(id: number): Promise<WorkOutType> {
    return await this.workOutTypeRepository.findOne({ where: { id } });
  }

  async workoutTypefindAll(): Promise<WorkOutType[]> {
    const result = await this.dataSource.query('CALL getWorkOutTypeData()');
    return result[0];
  }

  async removeWorkoutType(id: number): Promise<void> {
    await this.workOutTypeRepository.delete(id);
  }

  // status

  async updateWorkOutType(id: any, isActive: boolean) {
    console.log(id);
    const workOutType: any = await this.workOutTypeRepository.findOne({
      where: { id: id },
    });
    if (!workOutType) {
      throw new Error('workOutType not found');
    }

    workOutType.isActive = isActive ? 1 : 0;

    return this.workOutTypeRepository.save(workOutType);
  }

  // exercise

  async createExercise(body) {
    try {
      await this.exerciseRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving Exercise', error);
      throw new Error('Failed to save Exercise');
    }
  }

  async updateExercise(body) {
    try {
      const updateExercise = await this.exerciseRepository.update(
        { id: body.id },
        body,
      );
      return updateExercise;
    } catch (error) {
      console.error('Error updating Exercise', error);
      throw new Error('Failed to updating Exercise');
    }
  }

  async exercisefindOne(id: number): Promise<Exercise> {
    return await this.exerciseRepository.findOne({ where: { id } });
  }

  async exercisefindAll(): Promise<Exercise[]> {
    const result = await this.dataSource.query('CALL getAllExerciseData()');
    return result[0];
  }

  async removeExercise(id: number): Promise<void> {
    await this.exerciseRepository.delete(id);
  }

  // status

  async updateExercisestatus(id: any, isActive: boolean) {
    console.log(id);
    const exerciseType: any = await this.exerciseRepository.findOne({
      where: { id: id },
    });
    if (!exerciseType) {
      throw new Error('exerciseType not found');
    }

    exerciseType.isActive = isActive ? 1 : 0;

    return this.exerciseRepository.save(exerciseType);
  }

  ///////////// workOut chart ///////////////////

  async getmemberList() {
    const result = await this.dataSource.query('CALL getmemberList()');
    return result[0];
  }

  async getWorkOutList() {
    const result = await this.dataSource.query('CALL getWorkOutList()');
    return result[0];
  }

  async getExerciseList() {
    const result = await this.dataSource.query('CALL getExerciseList()');
    return result[0];
  }

  ///// pupter ////

  async generatePdf(
    templateData: any,
    viewPath: string,
    filename: string,
  ): Promise<Buffer> {
    const absoluteViewPath = path.join(__dirname, '../../', viewPath);
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      const html = await new Promise<string>((resolve, reject) => {
        twig.renderFile(absoluteViewPath, templateData, (err, html) => {
          if (err) reject(err);
          else resolve(html);
        });
      });

      await page.setContent(html, { waitUntil: 'networkidle0' });
      const pdfBuffer = await page.pdf({
        format: 'A4',
        margin: {
          top: '0.5in',
          bottom: '0.5in',
          left: '0.5in',
          right: '0.5in',
        },
        printBackground: true,
      });

      await browser.close();

      return Buffer.from(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  }

  // freeze

  // freeze

  async getMemberListInFreeze() {
    const result = await this.dataSource.query('CALL getmemberListInFreeze()');
    return result[0];
  }

  async createfreeze(body) {
    console.log('aaaabody', body);
    console.log('kaa', body.Member);

    try {
      // const member = await this.memberRepository.findOne({
      //   where: { id: body.id },
      // });

      // console.log('member', member);

      // member.endDate = body.endDate;
      // member.freezeStatus = 1;
      // await this.memberRepository.save(member);

      await this.freezeRepository.save(body);

      return body;
    } catch (error) {
      console.error('Error saving Freeze', error);
      throw new Error('Failed to save Freeze');
    }
  }

  async updateFreeze(body) {
    try {
      const updateFreeze = await this.freezeRepository.update(
        { id: body.id },
        body,
      );
      return updateFreeze;
    } catch (error) {
      console.error('Error updating Freeze', error);
      throw new Error('Failed to updating Freeze');
    }
  }

  async freezefindOne(id: number) {
    const result = await this.dataSource.query('Call getFreezeData(?)', [id]);
    console.log('result', result);
    return result[0][0];
  }

  async freezefindAll(): Promise<Freeze[]> {
    const result = await this.dataSource.query('CALL getAllFreezeData()');
    return result[0];
  }

  async removefreeze(id: number): Promise<void> {
    await this.freezeRepository.delete(id);
  }

  // status

  async updatefreezestatus(id: any, isActive: boolean) {
    console.log(id);
    const freezeType: any = await this.freezeRepository.findOne({
      where: { id: id },
    });
    if (!freezeType) {
      throw new Error('freezeType not found');
    }

    freezeType.isActive = isActive ? 1 : 0;

    return this.freezeRepository.save(freezeType);
  }

  //  gst Service

  async createGst(body) {
    try {
      await this.gstRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving GST', error);
      throw new Error('Failed to save GST');
    }
  }

  async updateGst(body) {
    try {
      const updateGst = await this.gstRepository.update({ id: body.id }, body);
      return updateGst;
    } catch (error) {
      console.error('Error updating GST', error);
      throw new Error('Failed to updating GST');
    }
  }

  async gstfindOne(id: number) {
    const result = await this.dataSource.query('Call getGstData(?)', [id]);
    console.log('result', result);
    return result[0][0];
  }

  async gstfindAll(): Promise<Gst[]> {
    const result = await this.dataSource.query('CALL getAllGstData()');
    return result[0];
  }

  async removeGst(id: number): Promise<void> {
    await this.freezeRepository.delete(id);
  }

  async updategststatus(id: any, isActive: boolean) {
    console.log(id);
    const gstType: any = await this.gstRepository.findOne({
      where: { id: id },
    });
    if (!gstType) {
      throw new Error('=gstType not found');
    }

    gstType.isActive = isActive ? 1 : 0;

    return this.gstRepository.save(gstType);
  }

  async createpettycash(body) {
    try {
      await this.pettyCashRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving BankDetails', error);
      throw new Error('Failed to save pettycash');
    }
  }

  async updatepettycash(body) {
    try {
      const updatepettycash = await this.pettyCashRepository.update(
        { id: body.id },
        body,
      );
      return updatepettycash;
    } catch (error) {
      console.error('Error updating pettyCash', error);
      throw new Error('Failed to updating pettyCash');
    }
  }

  async pettycashfindOne(id: number) {
    const result = await this.dataSource.query('Call getPettyCashData(?)', [
      id,
    ]);
    console.log('result', result);
    return result[0][0];
  }

  async pettycashfindAll(): Promise<Freeze[]> {
    const result = await this.dataSource.query('CALL getAllDataPettyCash()');
    return result[0];
  }

  async removepettycash(id: number): Promise<void> {
    await this.pettyCashRepository.delete(id);
  }

  async updatepettycashstatus(id: any, isActive: boolean) {
    console.log(id);
    const gstType: any = await this.pettyCashRepository.findOne({
      where: { id: id },
    });
    if (!gstType) {
      throw new Error('=gstType not found');
    }

    gstType.isActive = isActive ? 1 : 0;

    return this.pettyCashRepository.save(gstType);
  }

  async createbank(body) {
    try {
      await this.bankDetailsRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving BankDetails', error);
      throw new Error('Failed to save BankDetails');
    }
  }

  async updatebank(body) {
    try {
      const updatebank = await this.bankDetailsRepository.update(
        { id: body.id },
        body,
      );
      return updatebank;
    } catch (error) {
      console.error('Error updating BankDetails', error);
      throw new Error('Failed to updating BankDetails');
    }
  }

  async bankfindOne(id: number) {
    const result = await this.dataSource.query('Call getBankDetails(?)', [id]);
    console.log('result', result);
    return result[0][0];
  }

  async bankfindAll(): Promise<BankDetails[]> {
    const result = await this.dataSource.query('CALL getAllBankDetails()');
    return result[0];
  }

  async removebank(id: number): Promise<void> {
    await this.bankDetailsRepository.delete(id);
  }

  async updatebankstatus(id: any, isActive: boolean) {
    console.log(id);
    const bankType: any = await this.bankDetailsRepository.findOne({
      where: { id: id },
    });
    if (!bankType) {
      throw new Error('=bankType not found');
    }

    bankType.isActive = isActive ? 1 : 0;

    return this.bankDetailsRepository.save(bankType);
  }

  // branch

  async createbranch(body) {
    try {
      await this.branchDetailsRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving BankDetails', error);
      throw new Error('Failed to save BankDetails');
    }
  }

  async updatebranch(body) {
    try {
      const updatebranch = await this.branchDetailsRepository.update(
        { id: body.id },
        body,
      );
      return updatebranch;
    } catch (error) {
      console.error('Error updating updatebranch', error);
      throw new Error('Failed to updating updatebranch');
    }
  }

  async branchfindOne(id: number) {
    const result = await this.dataSource.query('Call getBranchDetails(?)', [
      id,
    ]);
    console.log('result', result);
    return result[0][0];
  }

  async branchfindAll(): Promise<Freeze[]> {
    const result = await this.dataSource.query('CALL getAllBranchDetails()');
    return result[0];
  }

  async removebranch(id: number): Promise<void> {
    await this.branchDetailsRepository.delete(id);
  }

  async updatebranchstatus(id: any, isActive: boolean) {
    console.log(id);
    const branchtype: any = await this.branchDetailsRepository.findOne({
      where: { id: id },
    });
    if (!branchtype) {
      throw new Error('branchtype not found');
    }

    branchtype.isActive = isActive ? 1 : 0;

    return this.branchDetailsRepository.save(branchtype);
  }

  // expense

  async createexpense(body) {
    try {
      await this.expenseRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving expense', error);
      throw new Error('Failed to save expense');
    }
  }

  async updateexpense(body) {
    try {
      const updateexpense = await this.expenseRepository.update(
        { id: body.id },
        body,
      );
      return updateexpense;
    } catch (error) {
      console.error('Error updating updateexpense', error);
      throw new Error('Failed to updating updateexpense');
    }
  }

  async expensefindOne(id: number) {
    const result = await this.dataSource.query('Call getExpenseData(?)', [id]);
    console.log('result', result);
    return result[0][0];
  }

  async expensefindAll(): Promise<Freeze[]> {
    const result = await this.dataSource.query('CALL getAllExpenseData()');
    return result[0];
  }

  async removeexpense(id: number): Promise<void> {
    await this.expenseRepository.delete(id);
  }

  async updateexpensestatus(id: any, isActive: boolean) {
    const expense: any = await this.expenseRepository.findOne({
      where: { id: id },
    });
    if (!expense) {
      throw new Error('branchtype not found');
    }

    expense.isActive = isActive ? 1 : 0;

    return this.expenseRepository.save(expense);
  }

  async receivepayments(body) {
    try {
      await this.receivePaymentRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving receivepayments', error);
      throw new Error('Failed to save receivepayments');
    }
  }

  async updateReceivepayments(body) {
    try {
      const updateReceivepayments = await this.receivePaymentRepository.update(
        { id: body.id },
        body,
      );
      return updateReceivepayments;
    } catch (error) {
      console.error('Error updating updateReceivepayments', error);
      throw new Error('Failed to updating updateReceivepayments');
    }
  }

  async receivepaymentsfindOne(id: number) {
    const result = await this.dataSource.query('Call getReceivePayment(?)', [
      id,
    ]);
    console.log('result', result);
    return result[0][0];
  }

  async ReceivepaymentsfindAll(): Promise<Freeze[]> {
    const result = await this.dataSource.query('CALL getAllReceivePayment()');
    return result[0];
  }

  async removeReceivepayments(id: number): Promise<void> {
    await this.receivePaymentRepository.delete(id);
  }

  async updateReceivepaymentsstatus(id: any, isActive: boolean) {
    const expense: any = await this.receivePaymentRepository.findOne({
      where: { id: id },
    });
    if (!expense) {
      throw new Error('branchtype not found');
    }

    expense.isActive = isActive ? 1 : 0;

    return this.receivePaymentRepository.save(expense);
  }

  //     due payments

  async fetchDuePayments() {
    const result = await this.dataSource.query('CALL getDuePendingPayments()');
    return result[0];
  }

  //     due paidPayment

  async duepaidPaymentfindOne(id: number) {
    const result = await this.dataSource.query('Call getDuePaidPayment(?)', [
      id,
    ]);
    console.log('result', result);
    return result[0][0];
  }

  async getBankDetails() {
    const result = await this.dataSource.query('CALL getBankDetailsList()');
    return result[0];
  }

  //   withDraw

  async createwithDraw(body) {
    try {
      await this.withdrawRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving ', error);
      throw new Error('Failed to save ');
    }
  }

  async updatewithDraw(body) {
    try {
      const updatewithDraw = await this.withdrawRepository.update(
        { id: body.id },
        body,
      );
      return updatewithDraw;
    } catch (error) {
      console.error('Error updating updateexpense', error);
      throw new Error('Failed to updating updateexpense');
    }
  }

  async withDrawfindOne(id: number) {
    const result = await this.dataSource.query('Call getWithDrawData(?)', [id]);
    console.log('result', result);
    return result[0][0];
  }

  async withDrawfindAll(): Promise<Freeze[]> {
    const result = await this.dataSource.query('CALL getAllWithDrawData()');
    return result[0];
  }

  async removewithDraw(id: number): Promise<void> {
    await this.withdrawRepository.delete(id);
  }

  async updatewithDrawstatus(id: any, isActive: boolean) {
    const updatewithDrawstatus: any = await this.withdrawRepository.findOne({
      where: { id: id },
    });
    if (!updatewithDrawstatus) {
      throw new Error('branchtype not found');
    }

    updatewithDrawstatus.isActive = isActive ? 1 : 0;

    return this.withdrawRepository.save(updatewithDrawstatus);
  }

  async createtopup(body) {
    try {
      await this.topupRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving ', error);
      throw new Error('Failed to save ');
    }
  }

  async updatetopup(body) {
    try {
      const updatetopup = await this.topupRepository.update(
        { id: body.id },
        body,
      );
      return updatetopup;
    } catch (error) {
      console.error('Error updating updatetopup', error);
      throw new Error('Failed to updating updatetopup');
    }
  }

  async topupfindOne(id: number) {
    const result = await this.dataSource.query('Call getTopupList(?)', [id]);
    console.log('result', result);
    return result[0][0];
  }

  async topupfindAll(): Promise<Freeze[]> {
    const result = await this.dataSource.query('CALL getAllTopupList()');
    return result[0];
  }

  async removetopup(id: number): Promise<void> {
    await this.topupRepository.delete(id);
  }

  async updatetopupstatus(id: any, isActive: boolean) {
    const updatetopupstatus: any = await this.topupRepository.findOne({
      where: { id: id },
    });
    if (!updatetopupstatus) {
      throw new Error('branchtype not found');
    }

    updatetopupstatus.isActive = isActive ? 1 : 0;

    return this.topupRepository.save(updatetopupstatus);
  }

  async stafffindAll(): Promise<Freeze[]> {
    const result = await this.dataSource.query('CALL getStaffAllList()');
    return result[0];
  }

  async getstaffTrainer(): Promise<Freeze[]> {
    const result = await this.dataSource.query('CALL getstaffTrainer()');
    return result[0];
  }

  //   cashtop

  async createCashtop(body) {
    try {
      await this.cashTopUpRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving Water consumption', error);
      throw new Error('Failed to save Water consumption');
    }
  }

  async updateCashtop(body) {
    try {
      const updateCashtop = await this.cashTopUpRepository.update(
        { id: body.id },
        body,
      );
      return updateCashtop;
    } catch (error) {
      console.error('Error updating Cashtop', error);
      throw new Error('Failed to updating Cashtop');
    }
  }

  async cashtopfindOne(id: number): Promise<CashTopUp> {
    return await this.cashTopUpRepository.findOne({ where: { id } });
  }

  async cashtopfindAll(): Promise<CashTopUp[]> {
    const result = await this.dataSource.query('CALL getAllCashTopList()');
    return result[0];
  }

  async removeCashtop(id: number): Promise<void> {
    await this.cashTopUpRepository.delete(id);
  }

  // status

  async updateCashtopStatus(id: any, isActive: boolean) {
    console.log(id);
    const Cashtop: any = await this.cashTopUpRepository.findOne({
      where: { id: id },
    });
    if (!Cashtop) {
      throw new Error('meter not found');
    }

    Cashtop.isActive = isActive ? 1 : 0;

    return this.cashTopUpRepository.save(Cashtop);
  }

  //   withDraw

  async createWithdrawal(body) {
    try {
      await this.withdrawalRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving Withdrawal', error);
      throw new Error('Failed to save WWithdrawal');
    }
  }

  async updateWithdrawal(body) {
    try {
      const updateWithdrawal = await this.withdrawalRepository.update(
        { id: body.id },
        body,
      );
      return updateWithdrawal;
    } catch (error) {
      console.error('Error updating Withdrawal', error);
      throw new Error('Failed to updating Withdrawal');
    }
  }

  async withdrawalfindOne(id: number): Promise<CashTopUp> {
    return await this.withdrawalRepository.findOne({ where: { id } });
  }

  async withdrawalfindAll(): Promise<CashTopUp[]> {
    const result = await this.dataSource.query('CALL getAllWithdrawalList()');
    return result[0];
  }

  async withdrawaldelete(id: number): Promise<void> {
    await this.withdrawalRepository.delete(id);
  }

  // status

  async withdrawalstatus(id: any, isActive: boolean) {
    console.log(id);
    const Cashtop: any = await this.withdrawalRepository.findOne({
      where: { id: id },
    });
    if (!Cashtop) {
      throw new Error('meter not found');
    }

    Cashtop.isActive = isActive ? 1 : 0;

    return this.withdrawalRepository.save(Cashtop);
  }

  //   assets

  async createAssets(body) {
    try {
      console.log('jajaj', body);
      await this.assetRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving Withdrawal', error);
      throw new Error('Failed to save WWithdrawal');
    }
  }

  async updateAssets(body) {
    try {
      const updateWithdrawal = await this.assetRepository.update(
        { id: body.id },
        body,
      );
      return updateWithdrawal;
    } catch (error) {
      console.error('Error updating Withdrawal', error);
      throw new Error('Failed to updating Withdrawal');
    }
  }

  async assetsfindOne(id: number): Promise<Asset> {
    return await this.assetRepository.findOne({ where: { id } });
  }

  async assetsfindAll(): Promise<CashTopUp[]> {
    const result = await this.dataSource.query('CALL getAllAssetList()');
    return result[0];
  }

  async assetsdelete(id: number): Promise<void> {
    await this.assetRepository.delete(id);
  }

  // status

  async assetsstatus(id: any, isActive: boolean) {
    console.log(id);
    const assets: any = await this.assetRepository.findOne({
      where: { id: id },
    });
    if (!assets) {
      throw new Error('asset not found');
    }

    assets.isActive = isActive ? 1 : 0;

    return this.assetRepository.save(assets);
  }

  //   feedback

  async createfeedback(body) {
    try {
      console.log('aajajaj', body);
      await this.feedBackRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving Withdrawal', error);
      throw new Error('Failed to save WWithdrawal');
    }
  }

  async updatefeedback(body) {
    try {
      const updateWithdrawal = await this.feedBackRepository.update(
        { id: body.id },
        body,
      );
      return updateWithdrawal;
    } catch (error) {
      console.error('Error updating Withdrawal', error);
      throw new Error('Failed to updating Withdrawal');
    }
  }

  async feedbackfindOne(id: number): Promise<FeedBack> {
    return await this.feedBackRepository.findOne({ where: { id } });
  }

  async feedbackfindAll(): Promise<CashTopUp[]> {
    const result = await this.dataSource.query('CALL getAllFeedBackList()');
    return result[0];
  }

  async feedbackdelete(id: number): Promise<void> {
    await this.feedBackRepository.delete(id);
  }

  // status

  async feedbackstatus(id: any, isActive: boolean) {
    console.log(id);
    const feedback: any = await this.feedBackRepository.findOne({
      where: { id: id },
    });
    if (!feedback) {
      throw new Error('feedback not found');
    }

    feedback.isActive = isActive ? 1 : 0;

    return this.feedBackRepository.save(feedback);
  }

  //   free program

  async createfreeProgram(body) {
    try {
      console.log('aajajaj', body);
      await this.freeProgramRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving Withdrawal', error);
      throw new Error('Failed to save WWithdrawal');
    }
  }

  async updatefreeProgram(body) {
    try {
      const updateWithdrawal = await this.freeProgramRepository.update(
        { id: body.id },
        body,
      );
      return updateWithdrawal;
    } catch (error) {
      console.error('Error updating Withdrawal', error);
      throw new Error('Failed to updating Withdrawal');
    }
  }

  async freeProgramfindOne(id: number): Promise<FreeProgram> {
    return await this.freeProgramRepository.findOne({ where: { id } });
  }

  async freeProgramfindAll(): Promise<CashTopUp[]> {
    const result = await this.dataSource.query('CALL getAllFreeProgramList()');
    return result[0];
  }

  async freeProgramdelete(id: number): Promise<void> {
    await this.freeProgramRepository.delete(id);
  }

  // status

  async freeProgramstatus(id: any, isActive: boolean) {
    console.log(id);
    const freeProgram: any = await this.freeProgramRepository.findOne({
      where: { id: id },
    });
    if (!freeProgram) {
      throw new Error('freeProgram not found');
    }

    freeProgram.isActive = isActive ? 1 : 0;

    return this.freeProgramRepository.save(freeProgram);
  }

  //   payment Type

  async createpaymentType(body) {
    try {
      console.log('aajajaj', body);
      await this.paymentTypeRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving Withdrawal', error);
      throw new Error('Failed to save WWithdrawal');
    }
  }

  async updatepaymentType(body) {
    try {
      const updateWithdrawal = await this.paymentTypeRepository.update(
        { id: body.id },
        body,
      );
      return updateWithdrawal;
    } catch (error) {
      console.error('Error updating Withdrawal', error);
      throw new Error('Failed to updating Withdrawal');
    }
  }

  async paymentTypefindOne(id: number): Promise<PaymentType> {
    return await this.paymentTypeRepository.findOne({ where: { id } });
  }

  async paymentTypefindAll(): Promise<CashTopUp[]> {
    const result = await this.dataSource.query('CALL getAllPaymentTypeList()');
    return result[0];
  }

  async paymentTypedelete(id: number): Promise<void> {
    await this.paymentTypeRepository.delete(id);
  }

  // status

  async paymentTypestatus(id: any, isActive: boolean) {
    console.log(id);
    const paymentType: any = await this.paymentTypeRepository.findOne({
      where: { id: id },
    });
    if (!paymentType) {
      throw new Error('paymentType not found');
    }

    paymentType.isActive = isActive ? 1 : 0;

    return this.paymentTypeRepository.save(paymentType);
  }

  //   cctv

  async createwatchCCTV(body) {
    console.log('body', body);
    const setting = new Setting();
    setting.key = 'cctvUrl';
    setting.value = body.cctvUrl;
    const savedSetting = await this.settingRepository.save(setting);

    return savedSetting;
  }

  async watchCCtvfindAll(): Promise<CashTopUp[]> {
    const result = await this.dataSource.query('CALL getAllSettingList()');
    return result[0][0];
  }

  async updateCCTV(id: any, key: string, value: string): Promise<Setting> {
    const cctv = await this.settingRepository.findOne({ where: { id } });

    if (!cctv) {
      return;
    }

    cctv.key = key;
    cctv.value = value;

    return this.settingRepository.save(cctv);
  }

  //   salary

  async salaryAdd(body) {
    try {
      console.log('aajajaj', body);
      await this.salaryRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving Withdrawal', error);
      throw new Error('Failed to save WWithdrawal');
    }
  }

  async updatesalary(body) {
    try {
      const updateWithdrawal = await this.salaryRepository.update(
        { id: body.id },
        body,
      );
      return updateWithdrawal;
    } catch (error) {
      console.error('Error updating Withdrawal', error);
      throw new Error('Failed to updating Withdrawal');
    }
  }

  async salaryfindOne(id: number): Promise<Salary> {
    return await this.salaryRepository.findOne({ where: { id } });
  }

  async salaryfindAll(): Promise<CashTopUp[]> {
    const result = await this.dataSource.query('CALL getAllSalaryList()');
    return result[0];
  }

  async salarydelete(id: number): Promise<void> {
    await this.salaryRepository.delete(id);
  }

  // status

  async salarystatus(id: any, isActive: boolean) {
    console.log(id);
    const salary: any = await this.salaryRepository.findOne({
      where: { id: id },
    });
    if (!salary) {
      throw new Error('salary not found');
    }

    salary.isActive = isActive ? 1 : 0;

    return this.salaryRepository.save(salary);
  }

  //   staff

  async getAllAssignManagerStaff(): Promise<Freeze[]> {
    const result = await this.dataSource.query(
      'CALL getAllAssignManagerStaff()',
    );
    return result[0];
  }

  async getAllAssignManager(): Promise<Freeze[]> {
    const result = await this.dataSource.query('CALL getAllAssignManager()');
    return result[0];
  }

  async saveassignManager(body) {
    try {
      console.log('hahaha',body)
      await this.assignManagerRepository.save(body);
      return body;
    } catch (error) {
      console.error('Error saving Assign Manager', error);
      throw new Error('Failed to save Assign Manager');
    }
  }

  async updateAssignManager(body) {
    try {
      const updateAssignManager = await this.assignManagerRepository.update(
        { id: body.id },
        body,
      );
      return updateAssignManager;
    } catch (error) {
      console.error('Error updating AssignManager', error);
      throw new Error('Failed to updating AssignManager');
    }
  }

  async assignManagerfindOne(id: number): Promise<AssignManager> {
    return await this.assignManagerRepository.findOne({ where: { id } });
  }

  async assignManagerfindAll(): Promise<AssignManager[]> {
    const result = await this.dataSource.query('CALL getAllAssignManagerList()');
    return result[0];
  }

  async assignManagerdelete(id: number): Promise<void> {
    await this.assignManagerRepository.delete(id);
  }

  // status

  async assignManagerstatus(id: any, isActive: boolean) {
    console.log(id);
    const assignManager: any = await this.assignManagerRepository.findOne({
      where: { id: id },
    });
    if (!assignManager) {
      throw new Error('assignManager not found');
    }

    assignManager.isActive = isActive ? 1 : 0;

    return this.assignManagerRepository.save(assignManager);
  }



  async staffPerformanceSave(data: any) {

    const ratingDetails = data.ratings;
    delete data.ratings;


    const saveStaffPerformance = {
      date: data.date,
      staff_name: data.staff_name,
      rating: data.rating
    };

    const result = await this.staffPerformanceRepository.save(saveStaffPerformance);
    if(ratingDetails){
      for(let i=0;i<ratingDetails.length;i++){
        console.log('hahaha',ratingDetails[i])
        const saveMetaData ={
          staffPerformanceId: result.id.toString(),
          criterion:ratingDetails[i].criterion,
          stars:ratingDetails[i].stars
        };
        const ratingDetailsSave = await this.staffPerformanceMetaRepository.save(saveMetaData);
      }
    }

    return result;
  }

}
