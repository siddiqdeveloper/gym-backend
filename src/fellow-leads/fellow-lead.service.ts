import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FellowLead } from './fellow-lead.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class FellowLeadService {
  constructor(
    private dataSource: DataSource, 
  ) {}



  // Fetch fellow leads by a specific date
  async findByDate(date: Date) {
    const result = await this.dataSource.query('CALL getFellowupLead(?)',[date]);
    console.log()
    return result[0];
 
  }

 
}
