import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FellowLead } from '../entities/fellow-lead.entity';  
import { DataSource } from 'typeorm';

@Injectable()
export class FellowLeadService {
  constructor(
    @InjectRepository(FellowLead)
    private fellowLeadRep: Repository<FellowLead>,
    private dataSource: DataSource, 

  ) {}


  async updateLeads(data){

    for(var i = 0; i<data.leads.length;i++){
      if(data.leads[i].reason && data.leads[i].fellowup_date != ''){
        

       let findData =  await this.fellowLeadRep.findOne({where:{fellowup_date:data.leads[i].fellowup_date,lead_id:data.leads[i].lead_id}});
        
        if(!findData){

          await this.fellowLeadRep.save(data.leads[i]);


        }
       
      }
    }


  }


  // Fetch fellow leads by a specific date
  async findByDate(date: any) {
    const result = await this.dataSource.query('CALL getFellowupLead(?)',[date]);
    console.log()
    return result[0];
 
  }

  async findByDateDOB(date: any) {
    const result = await this.dataSource.query('CALL getFellowupDOB(?)',[date]);
    console.log()
    return result[0];
 
  }



  async getPackageExpiry(count:any){
    const result = await this.dataSource.query('CALL getPackagesExpried(?)',[count]);
    return result[0];

  }

  async getInActiveLeads(){
    const result = await this.dataSource.query('CALL getNotActiveFellowupLeads()');
    console.log()
    return result[0];
 

  }

 
}
