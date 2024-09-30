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

  async findAll(): Promise<Lead[]> {
    const result = await this.dataSource.query('CALL get_all_leads()');
    console.log()
    return result[0];
  }

  async findOne(id: number): Promise<Lead> {
    return await this.leadRepository.findOne({ where: { id } });
  }

  async update(id: number, leadData: Partial<Lead>): Promise<Lead> {
    await this.leadRepository.update(id, leadData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.leadRepository.delete(id);
  }
}
