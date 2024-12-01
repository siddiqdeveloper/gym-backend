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
import {Expense} from "../entities/expense.entity";
import {ReceivePayment} from "../entities/receive_payment,entity";
import {Withdraw} from "../entities/withDraw.entity";
import {Topup} from "../entities/topup.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Member,ElectricityConsumption,WaterConsumption,
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
    Topup
  ])],
  providers: [MiscService],
  controllers: [MiscController],
  exports: [MiscService],
})
export class MiscModule {}


