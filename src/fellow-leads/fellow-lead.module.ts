import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowLead } from '../entities/follow-lead.entity';
import { FellowLeadService } from './fellow-lead.service';
import { FellowLeadController } from './fellow-lead.controller';
import { ContinuesAssignment } from 'src/entities/continuesAssignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContinuesAssignment])],
  providers: [FellowLeadService],
  controllers: [FellowLeadController],
})
export class FellowLeadModule {}
