import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElectricityConsumption } from 'src/entities/electricityConsumption.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MiscService {
    constructor(
        private dataSource: DataSource,
        @InjectRepository(ElectricityConsumption)
        private electricityConsumptionRepository: Repository<ElectricityConsumption>,
    ) {}


    // electricity Consumption

    async saveElectricityConsumption(body) {
       
        try {
           
            if (body.startDate) {
                body.startDate = new Date(body.startDate).toISOString().slice(0, 10);
            }
            if (body.endDate) {
                body.endDate = new Date(body.endDate).toISOString().slice(0, 10);
            }
            await this.electricityConsumptionRepository.save(body);
            return body;
        } catch (error) {
            console.error('Error saving electricity consumption', error);
            throw new Error('Failed to save electricity consumption');
        }
    }


    async updateMeter(body) {
        try {
            console.log('jsjs',body)
         const updatemeter = await this.electricityConsumptionRepository.update({id:body.id},body)
         return updatemeter
        } catch(error) {
            console.error('Error updating electricity consumption', error);
            throw new Error('Failed to updating electricity consumption');
        }
    }


    async meterfindOne(id: number): Promise<ElectricityConsumption> {
        return await this.electricityConsumptionRepository.findOne({ where: { id } });
      }


    //  manage page data shows 

    
  async meterReadingfindAll(): Promise<ElectricityConsumption[]> {
    const result = await this.dataSource.query('CALL get_all_electricityConsumption()');
    console.log()
    return result[0];
  }


//  delete 

async removeMeter(id: number): Promise<void> {
    await this.electricityConsumptionRepository.delete(id);
  }

    
}

