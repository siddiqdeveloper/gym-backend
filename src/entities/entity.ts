import { FellowLead } from "./fellow-lead.entity";
import { Lead } from "./Lead.entity";
import { Member } from "./Member.entity";
import { Package } from "./Package.entity";
import { Payment } from "./Payment";
import { Staff } from "./staff.entity";
import { User } from "./User.entity";
import { ElectricityConsumption } from "./electricityConsumption.entity";
import { WaterConsumption } from "./waterConsumption.entity";
import { ServiceLog } from "./servicelog.entity";
import { Reminder } from "./reminder.entity";
import { CheckList } from "./checkList.entity";
import { WorkOutType } from "./workOutType.entity";
import { Exercise } from "./exercise.entity";
import { Freeze } from "./freeze.entity";
import { InActiveMember } from "./inActiveMember.entity";
import { Gst } from "./gst.entity";
import { PettyCash } from "./pettyCash.entity";
import { BankDetails } from "./bankDetails.entity";
import { BranchDetails } from "./branchDetails.entity";
import {Expense} from "./expense.entity";
import {ReceivePayment} from "./receive_payment,entity";
import {DuePaidPayment} from "./duePaidPayment.entity";
import {Withdraw} from "./withDraw.entity";
import {Topup} from "./topup.entity";
import {BulkUpload} from "./bulkUpload.entity";
import {BulkUploadMeta} from "./bulkUploadMeta.entity";

const entities = [
  User,
  Lead,
  Member,
  Package,
  Staff,
  Payment,
  ElectricityConsumption,
  WaterConsumption,
  ServiceLog,
  Reminder,
  CheckList,
  WorkOutType,
  Exercise,
  Freeze,
  InActiveMember,
  Gst,
  PettyCash,
  BankDetails,
  BranchDetails,
  Expense,
  ReceivePayment,
  DuePaidPayment,
  Withdraw,
  Topup,
  BulkUpload,
  BulkUploadMeta
 
];

export default entities;
