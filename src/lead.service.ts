import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/Lead.entity';


@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
  ) {}

  async create(leadData: Partial<Lead>): Promise<Lead> {
    const lead = this.leadRepository.create(leadData);
    return await this.leadRepository.save(lead);
  }

  async findAll(): Promise<Lead[]> {
    return await this.leadRepository.find();
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
