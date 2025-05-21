import { FollowLead } from "./follow-lead.entity";
import { Lead } from "./Lead.entity";
import { Member } from "./Member.entity";
import { Package } from "./Package.entity";
import { Payment } from "./Payment";
import { Staff } from "./staff.entity";
import { User } from "./user.entity";
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
import {Bmi} from "./bmi.entity";
import {CashTopUp} from "./cashtop.entity";
import {Withdrawal} from "./withdrawal.entity";
import {Asset} from "./assets.entity";
import {FeedBack} from "./feedBack.entity";
import {FreeProgram} from "./freeProgram.entity";
import {PaymentType} from "./paymentType.entity";
import {Salary} from "./salary.entity";
import {Setting} from "./setting.entity"
import {Incentive} from "./incentive.entity";
import {MemberExchanger} from "./memberExchanger.entity";
import {Attendance} from "./attendance.entity";

import {AssignManager} from "./assignManager.entity";

import { EmailTemplate } from "./email-template.entity";
import {StaffPerformance} from "./staffperfomance.entity";
import {StaffPerformanceMeta} from "./staffPerformanceMeta,entity";
import { ContinuesAssignment } from "./continuesAssignment.entity";
import { FollowupContinue } from "./follow-continue.entity";
import { InactiveAssignment } from "./inactiveAssignment,entity";
import { DOBAssignment } from "./DOBAssignment.entity";
import { PackageExpiryAssignment } from "./PackageExpiryAssignment.entity";
import { leadsAssignment } from "./leadsAssignment.entity";
import { FollowupPackageExpriy } from "./followu-package-expriy.entity";
import { FollowupDOB } from "./follow-dob.entity";
import { FollowupDue } from "./follow-due.entity";
import { FollowupInActive } from "./follow-inactive.entity";
import { DueAssignment } from "./DueAssignment.entity";
import { FollowupReason } from "./follow-reason.entity";
import { BlockMembers } from "./blockMemebers.entity";
import { CheckListItem } from "./checkListtIem.entity";
import { StandardMessage } from "./StandardMessage";

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
  BulkUploadMeta,
  Bmi,
  CashTopUp,
  Withdrawal,
  Asset,
  FeedBack,
  FreeProgram,
  PaymentType,
  Setting,
  Salary,
  Incentive,
  MemberExchanger,
  Attendance,
  FollowLead,
  AssignManager,
  FollowupContinue,
  EmailTemplate,
  StaffPerformance,
  StaffPerformanceMeta,
  ContinuesAssignment,
  InactiveAssignment,
  DOBAssignment,
  PackageExpiryAssignment,
  leadsAssignment,
  FollowupPackageExpriy,
  FollowupDOB,
  FollowupDue,
  FollowupInActive,
  DueAssignment,
  FollowupReason,
  BlockMembers,
  CheckListItem,
  StandardMessage

 
];

export default entities;
