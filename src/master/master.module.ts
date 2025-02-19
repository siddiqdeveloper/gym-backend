import { Module } from '@nestjs/common';
import { MasterController } from './master.controller';
import { MasterService } from './master.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailTemplate } from 'src/entities/email-template.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmailTemplate
    ]),
  ],
  exports:[MasterService],
  controllers: [MasterController],
  providers: [MasterService],

})
export class MasterModule {}
