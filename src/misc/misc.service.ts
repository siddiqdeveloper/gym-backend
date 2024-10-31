import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckList } from 'src/entities/checkList.entity';

import { ElectricityConsumption } from 'src/entities/electricityConsumption.entity';
import { Reminder } from 'src/entities/reminder.entity';
import { ServiceLog } from 'src/entities/servicelog.entity';
import { WaterConsumption } from 'src/entities/waterConsumption.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MiscService {
    constructor(
        private dataSource: DataSource,
        @InjectRepository(ElectricityConsumption)
        private electricityConsumptionRepository: Repository<ElectricityConsumption>,
        @InjectRepository(WaterConsumption)
        private waterConsumptionRepository: Repository<WaterConsumption>,
        @InjectRepository(ServiceLog)
        private serviceLogRepository: Repository<ServiceLog>,
        @InjectRepository(Reminder)
        private reminderRepository: Repository<Reminder>,
        @InjectRepository(CheckList)
        private checkListRepository: Repository<CheckList>,
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
   
    return result[0];
  }


//  delete 

async removeMeter(id: number): Promise<void> {
    await this.electricityConsumptionRepository.delete(id);
  }


  // status 

  async updateStatus(id: any, isActive: boolean) {
    console.log(id)
    let meter:any = await this.electricityConsumptionRepository.findOne({where:{id:id}});
    if (!meter) {
      throw new Error('meter not found');
    }
   
    meter.isActive = isActive?1:0;
   
    return this.electricityConsumptionRepository.save(meter);
  }



//   water  Consumption


async createWater(body) {
    try {

        if(body.data){
            body.data = new Date(body.data).toISOString().slice(0, 10);
        }
        await this.waterConsumptionRepository.save(body);
        return body;

    } catch(error){
        console.error('Error saving Water consumption', error);
        throw new Error('Failed to save Water consumption');
    }
}



async updateWater(body) {
    try {
       
     const updateWater = await this.waterConsumptionRepository.update({id:body.id},body)
     return updateWater
    } catch(error) {
        console.error('Error updating Water consumption', error);
        throw new Error('Failed to updating Water consumption');
    }
}


async waterfindOne(id: number): Promise<WaterConsumption> {
    return await this.waterConsumptionRepository.findOne({ where: { id } });
  }



  async waterfindAll(): Promise<WaterConsumption[]> {
    const result = await this.dataSource.query('CALL get_all_waterConsumption()');
   return result[0];
  }



  async removeWater(id: number): Promise<void> {
    await this.waterConsumptionRepository.delete(id);
  }


  // status 

  async updateWaterStatus(id: any, isActive: boolean) {
    console.log(id)
    let water:any = await this.waterConsumptionRepository.findOne({where:{id:id}});
    if (!water) {
      throw new Error('meter not found');
    }
   
    water.isActive = isActive?1:0;
   
    return this.waterConsumptionRepository.save(water);
  }



  /////////////// service Log 

  async createServiceLog(body) {
    try {

        if(body.datePosted){
            body.datePosted = new Date(body.datePosted).toISOString().slice(0, 10);
        }
        if(body.estimatedDate){
            body.estimatedDate = new Date(body.estimatedDate).toISOString().slice(0, 10);
        }
        if(body.actualRepairedOn){
            body.actualRepairedOn = new Date(body.actualRepairedOn).toISOString().slice(0, 10);
        }
        await this.serviceLogRepository.save(body);
        return body;

    } catch(error){
        console.error('Error saving ServiceLog', error);
        throw new Error('Failed to save ServiceLog');
    }
}



async updateServiceLog(body) {
    try {
    const updateServiceLog = await this.serviceLogRepository.update({id:body.id},body)
     return updateServiceLog
    } catch(error) {
        console.error('Error updating ServiceLog', error);
        throw new Error('Failed to updating ServiceLog');
    }
}




async serviceLogfindOne(id: number): Promise<ServiceLog> {
    return await this.serviceLogRepository.findOne({ where: { id } });
  }



  async serviceLogfindAll(): Promise<ServiceLog[]> {
   
    const result = await this.dataSource.query('CALL get_all_serviceLog()');
   return result[0];
  }


 async removeServiceLog(id: number): Promise<void> {
    await this.serviceLogRepository.delete(id);
  }


  // service 

  async updateservicestatus(id: any, isActive: boolean) {
    console.log(id)
    let service:any = await this.serviceLogRepository.findOne({where:{id:id}});
    if (!service) {
      throw new Error('service not found');
    }
   
    service.isActive = isActive?1:0;
   
    return this.serviceLogRepository.save(service);
  }


  /////////////// reminder //////////////////


  async createReminder(body) {
    try {
       
      return  await this.reminderRepository.save(body);
    }
     catch(error){
        console.error('Error saving Reminder', error);
        throw new Error('Failed to save Reminder');
     }
  }


  async updateReminder(body) {
    try {
    const updateReminder = await this.reminderRepository.update({id:body.id},body)
     return updateReminder
    } catch(error) {
        console.error('Error updating Reminder', error);
        throw new Error('Failed to updating Reminder');
    }
}




async reminderfindOne(id: number): Promise<Reminder> {
    return await this.reminderRepository.findOne({ where: { id } });
  }



  async reminderfindAll() {
   
    const result = await this.dataSource.query('CALL get_all_reminder()');
    return result[0] 
  }



 async removeReminder(id: number): Promise<void> {
    await this.reminderRepository.delete(id);
  }


  // status 

  
  async updatereminderstatus(id: any, isActive: boolean) {
    console.log(id)
    let reminder:any = await this.reminderRepository.findOne({where:{id:id}});
    if (!reminder) {
      throw new Error('reminder not found');
    }
   
    reminder.isActive = isActive?1:0;
   
    return this.reminderRepository.save(reminder);
  }


  




//////////////checkList ////////////////////




async createCheckList(body) {
    try {
       
      return  await this.checkListRepository.save(body);
    }
     catch(error){
        console.error('Error saving CheckList', error);
        throw new Error('Failed to save CheckList');
     }
  }


  async updateCheckList(body) {
    try {
    const updateCheckList = await this.checkListRepository.update({id:body.id},body)
     return updateCheckList
    } catch(error) {
        console.error('Error updating CheckList', error);
        throw new Error('Failed to updating CheckList');
    }
}




async checkListfindOne(id: number): Promise<CheckList> {
    return await this.checkListRepository.findOne({ where: { id } });
  }



  async checkListfindAll(): Promise<CheckList[]> {
   const result = await this.dataSource.query('CALL get_all_checkList()');
     
    return result[0] 
  
  }









 async removeCheckList(id: number): Promise<void> {
    await this.checkListRepository.delete(id);
  }


    

  async updatecheckListStatus(id: any, isActive: boolean) {
   
    let checkList:any = await this.checkListRepository.findOne({where:{id:id}});
    if (!checkList) {
      throw new Error('checkList not found');
    }
   
    checkList.isActive = isActive?1:0;
   
    return this.checkListRepository.save(checkList);
  }

}
