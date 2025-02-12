import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities/entity';
import { MasterModule } from './master/master.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { UserModule } from './user/user.module';
import { MemberController } from './member.controller';
import { PackageController } from './package.controller';
import { MemberService } from './member.service';
import { PackageService } from './package.service';
import { Member } from './entities/Member.entity';
import { Package } from './entities/Package.entity';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';
import { Lead } from './entities/Lead.entity';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { Staff } from './entities/staff.entity';
import { FellowLeadController } from './fellow-leads/fellow-lead.controller';
import { FellowLeadService } from './fellow-leads/fellow-lead.service';
import { FellowLead } from './entities/fellow-lead.entity';
import { Payment } from './entities/Payment';
import { PaymentController } from './PaymentController';
import { PaymentService } from './payment.service';
import { MiscController } from './misc/misc.controller';
import { MiscService } from './misc/misc.service';
import { ElectricityConsumption } from './entities/electricityConsumption.entity';
import { WaterConsumption } from './entities/waterConsumption.entity';
import { ServiceLog } from './entities/servicelog.entity';
import { Reminder } from './entities/reminder.entity';
import { CheckList } from './entities/checkList.entity';
import { WorkOutType } from './entities/workOutType.entity';
import { Exercise } from './entities/exercise.entity';
import { Freeze } from './entities/freeze.entity';
import { MiscModule } from './misc/misc.module';
import { InActiveMember } from './entities/inActiveMember.entity';
import { Gst } from './entities/gst.entity';
import { PettyCash } from './entities/pettyCash.entity';
import { BankDetails } from './entities/bankDetails.entity';
import { BranchDetails } from './entities/branchDetails.entity';
import {Expense} from "./entities/expense.entity";
import {ReceivePayment} from "./entities/receive_payment,entity";
import {DuePaidPayment} from "./entities/duePaidPayment.entity";
import {Withdraw} from "./entities/withDraw.entity";
import {Topup} from "./entities/topup.entity";
import {BulkUpload} from "./entities/bulkUpload.entity";
import {BulkUploadMeta} from "./entities/bulkUploadMeta.entity";
import {Bmi} from "./entities/bmi.entity";
import {CashTopUp} from "./entities/cashtop.entity";
import {Withdrawal} from "./entities/withdrawal.entity";
import {Asset} from "./entities/assets.entity";
import {FeedBack} from "./entities/feedBack.entity";
import {FreeProgram} from "./entities/freeProgram.entity";
import {PaymentType} from "./entities/paymentType.entity";

import {Salary} from "./entities/salary.entity";
import {Setting}from "./entities/setting.entity"
import {Incentive} from "./entities/incentive.entity";
import {MemberExchanger} from "./entities/memberExchanger.entity";
import {Attendance} from "./entities/attendance.entity";
import { MailService } from './mail/mail.service';
import {MailController} from "./mail/mail.controller";


@Module({
  imports: [
    // CacheModule.register({
    //   isGlobal: true,
    //   store: redisStore,

    //   host: 'redis-13986.c301.ap-south-1-1.ec2.cloud.redislabs.com',
    //   port: 13986,
    //   username: 'default',
    //   password: 'DwGjX1vS1STq21EVII0U0WD8jkF6MLsu',
    //   no_ready_check: true,
    // }),
    
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.dbHost,
      port: Number(process.env.dbPort),
      username: process.env.dbUser,
      password: process.env.dbPassword,
      database: process.env.dbName,
      entities: entities,
      synchronize: process.env.dbSync === 'true',
      logging: "all",
      logger:"file",
    }),
    TypeOrmModule.forFeature([Member,Package,Lead,Staff,Payment,FellowLead,ElectricityConsumption,WaterConsumption,ServiceLog,Reminder,CheckList,WorkOutType,Exercise,Freeze,InActiveMember,Gst,PettyCash,BankDetails,BranchDetails,Expense,ReceivePayment,DuePaidPayment,Withdraw,Topup,BulkUpload,BulkUploadMeta,Bmi,CashTopUp,Withdrawal,Asset,PaymentType,
      FeedBack,FreeProgram,Salary,
      Setting,
      Incentive,
      MemberExchanger,
      Attendance
      ]),
    MasterModule,
    UserModule,
    MiscModule

  ],
  
  controllers: [AppController,MemberController,PackageController,LeadController,StaffController,FellowLeadController,PaymentController,MiscController,MailController],
  providers: [
    AppService,
    MemberService,
    PackageService,
    LeadService,
    StaffService,
    FellowLeadService,
    PaymentService,
    MailService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    MiscService,
    MailService,
  ],
})
export class AppModule {}
