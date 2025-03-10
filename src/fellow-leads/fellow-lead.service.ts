import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowLead } from '../entities/follow-lead.entity';  
import { DataSource } from 'typeorm';
import { Lead } from 'src/entities/Lead.entity';

@Injectable()
export class FellowLeadService {
  constructor(
    @InjectRepository(FollowLead)
    private fellowLeadRep: Repository<FollowLead>,
    @InjectRepository(Lead)
    private leadRep: Repository<Lead>,
    private dataSource: DataSource, 

  ) {}

  async unassignupdate(data){
    console.log(data)

    for(var i = 0; i<data.leads.length;i++){
        console.log(data.leads[i]);
        await this.leadRep.update({id:data.leads[i].id},{assignmentStaff:data.leads[i].assignmentStaff,
          assignmentStatus:data.leads[i].assignmentStatus})
       
      }
    }



  async updateLeads(data){

    for(var i = 0; i<data.leads.length;i++){
      if(data.leads[i].reason && data.leads[i].followup_date != ''){
        

       let findData =  await this.fellowLeadRep.findOne({where:{followup_date:data.leads[i].followup_date,lead_id:data.leads[i].lead_id}});
        
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

  async getFollowupInActive(date: any) {
    const result = await this.dataSource.query('CALL followupInActive(?)',[date]);
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

  async getUnassignment(){
    const result = await this.dataSource.query('CALL getunassignmentLeads()');
    return result[0];
  }

  async getInActiveLeads(){
    const result = await this.dataSource.query('CALL getNotActiveFellowupLeads()');
    return result[0];

  }

  async updateStatus(id: any, isActive: boolean) {
    console.log(id)
    let fellow:any = await this.fellowLeadRep.findOne({where:{id:id}});
    if (!fellow) {
      throw new Error('fellow not found');
    }
   
    fellow.isActive = isActive?1:0;
    console.log(fellow)
    return this.fellowLeadRep.save(fellow);
  }
}
