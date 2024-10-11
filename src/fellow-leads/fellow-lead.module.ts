import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FellowLead } from './fellow-lead.entity';
import { FellowLeadService } from './fellow-lead.service';
import { FellowLeadController } from './fellow-lead.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FellowLead])],
  providers: [FellowLeadService],
  controllers: [FellowLeadController],
})
export class FellowLeadModule {}
