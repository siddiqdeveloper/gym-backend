import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/entities/Member.entity';
import { MiscService } from './misc.service';
import { MiscController } from './misc.controller';
import { ElectricityConsumption } from 'src/entities/electricityConsumption.entity';
import { WaterConsumption } from 'src/entities/waterConsumption.entity';
import { ServiceLog } from 'src/entities/servicelog.entity';
import { Reminder } from 'src/entities/reminder.entity';
import { CheckList } from 'src/entities/checkList.entity';
import { WorkOutType } from 'src/entities/workOutType.entity';
import { Exercise } from 'src/entities/exercise.entity';
import { Freeze } from 'src/entities/freeze.entity';
import { Gst } from 'src/entities/gst.entity';
import { PettyCash } from 'src/entities/pettyCash.entity';
import { BankDetails } from 'src/entities/bankDetails.entity';
import { BranchDetails } from 'src/entities/branchDetails.entity';
import { Expense } from '../entities/expense.entity';
import { ReceivePayment } from '../entities/receive_payment,entity';
import { Withdraw } from '../entities/withDraw.entity';
import { Topup } from '../entities/topup.entity';
import { BulkUpload } from '../entities/bulkUpload.entity';
import { BulkUploadMeta } from '../entities/bulkUploadMeta.entity';
import {CashTopUp} from "../entities/cashtop.entity";
import {Withdrawal} from "../entities/withdrawal.entity";
import {Asset} from "../entities/assets.entity";
import {FeedBack} from "../entities/feedBack.entity";
import {FreeProgram} from "../entities/freeProgram.entity";
import {PaymentType} from "../entities/paymentType.entity";
import {Salary} from "../entities/salary.entity";
import {Setting} from "../entities/setting.entity"
import {AssignManager} from "../entities/assignManager.entity";
import {StaffPerformance} from "../entities/staffperfomance.entity";
import {StaffPerformanceMeta} from "../entities/staffPerformanceMeta,entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Member,
      ElectricityConsumption,
      WaterConsumption,
      ServiceLog,
      Reminder,
      CheckList,
      WorkOutType,
      Exercise,
      Freeze,
      Gst,
      PettyCash,
      BankDetails,
      BranchDetails,
      Expense,
      ReceivePayment,
      Withdraw,
      Topup,
      BulkUpload,
      BulkUploadMeta,
      CashTopUp,
      Withdrawal,
      Asset,
      FeedBack,
      FreeProgram,
      PaymentType,
      Salary,
      Setting,
      AssignManager,
      StaffPerformance,
      StaffPerformanceMeta

    ]),
  ],
  providers: [MiscService],
  controllers: [MiscController],
  exports: [MiscService],
})
export class MiscModule {}
