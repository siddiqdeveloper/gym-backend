import { Lead } from "./Lead.entity";
import { Member } from "./Member.entity";
import { Package } from "./Package.entity";
import { Staff } from "./staff.entity";
import { User } from "./User.entity";
import { ElectricityConsumption } from "./electricityConsumption.entity";
import { WaterConsumption } from "./waterConsumption.entity";
import { ServiceLog } from "./servicelog.entity";
import { Reminder } from "./reminder.entity";
import { CheckList } from "./checkList.entity";



const entities = [
  User,
  Lead,
  Member,
  Package,
  Staff,
  ElectricityConsumption,
  WaterConsumption,
  ServiceLog,
  Reminder,
  CheckList
 
];

export default entities;
