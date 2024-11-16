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

@Module({
  imports: [TypeOrmModule.forFeature([Member,ElectricityConsumption,WaterConsumption,
    ServiceLog,
    Reminder,
    CheckList,
    WorkOutType,
    Exercise,
    Freeze
  ])],
  providers: [MiscService],
  controllers: [MiscController],
  exports: [MiscService],
})
export class MiscModule {}


