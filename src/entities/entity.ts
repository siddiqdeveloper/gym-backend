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
  Exercise
 
];

export default entities;
