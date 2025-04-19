import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Lead } from './entities/Lead.entity';


@Injectable()
export class LeadService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
  ) {}

  async create(leadData: Partial<Lead>): Promise<Lead> {
    const lead = this.leadRepository.create(leadData);
    return await this.leadRepository.save(lead);
  }

  async findAll() {
    const result = await this.dataSource.query('CALL get_all_leads()');
    console.log()
    return result[0];
  }

 

  async findOne(id) {
    const result = await this.dataSource.query(
        'Call getLeadsData(' + id + ')',
        [],
    );
    if (result) {
      return result[0][0];
    }
  }




  async update(id: number, leadData: Partial<Lead>): Promise<Lead> {
    await this.leadRepository.update(id, leadData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.leadRepository.delete(id);
  }


  async updateLeadStatus(id: any, isActive: boolean) {
    console.log(id)
    let lead:any = await this.leadRepository.findOne({where:{id:id}});
    console.log('Lead from DB:', lead);
    if (!lead) {
      throw new Error('lead not found');
    }

   
  lead.isActive = isActive?1:0;
    console.log(lead)
    return this.leadRepository.save(lead);
  }

}
