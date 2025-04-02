import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowLead } from '../entities/follow-lead.entity';  
import { DataSource } from 'typeorm';
import { Lead } from 'src/entities/Lead.entity';
import { ContinuesAssignment } from 'src/entities/continuesAssignment.entity';
import { FollowupContinue } from 'src/entities/follow-continue.entity';
import { InactiveAssignment } from 'src/entities/follow-inactive.entity';
import { DOBAssignment } from 'src/entities/DOBAssignment.entity';

@Injectable()
export class FellowLeadService {
  constructor(
    @InjectRepository(FollowLead)
    private fellowLeadRep: Repository<FollowLead>,
    @InjectRepository(FollowupContinue)
    private followupContinueRep: Repository<FollowupContinue>,
    @InjectRepository(InactiveAssignment)
    private inactiveAssignmentRep: Repository<InactiveAssignment>,
    @InjectRepository(Lead)
    private leadRep: Repository<Lead>,
    @InjectRepository(ContinuesAssignment)
    private continuesAssignmentRep: Repository<ContinuesAssignment>,
    @InjectRepository(DOBAssignment)
    private DOBAssignmentRep: Repository<DOBAssignment>,

    
    private dataSource: DataSource, 

  ) {}

  async unassignupdate(data){
    console.log(data)

    for(var i = 0; i<data.list.length;i++){
       
        if(data.process == 'leads'){
          await this.leadRep.update({id:data.list[i].id},{assignmentStaff:data.list[i].assignmentStaff,
            assignmentStatus:data.list[i].assignmentStatus})
        }

        if(data.process == 'ca'){
          await this.continuesAssignmentRep.insert({member_code:data.list[i].memberId,member_id:data.list[i].id,staff_id:data.list[i].assignmentStaff})
        }

        if(data.process == 'inactive'){

          await this.inactiveAssignmentRep.insert({member_code:data.list[i].memberId,member_id:data.list[i].id,staff_id:data.list[i].assignmentStaff})
        
        }

        if(data.process == 'dob'){

          await this.DOBAssignmentRep.insert({member_code:data.list[i].memberId,member_id:data.list[i].id,staff_id:data.list[i].assignmentStaff})
        
        }

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

  async getFellowLeadsContinueabsendByDate(date: any) {
    const result = await this.dataSource.query('CALL getFellowupContinue(?)',[date]);
    console.log()
    return result[0];
 
  }



  
  async updateContinue(data){

    for(var i = 0; i<data.list.length;i++){
      if(data.list[i].reason && data.list[i].followup_date != ''){
      

       let findData =  await this.followupContinueRep.findOne({where:{followup_date:data.list[i].followup_date,member_id:data.list[i].id}});
        
        if(!findData){
          await this.followupContinueRep.save(data.list[i]);
        }
       
      }
    }

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

  async getContinueAbsents(query){
    const result = await this.dataSource.query('CALL getUnAssingmentCA('+query.days+')');
    return result[0];
  }

  async getInactive(query){
    const result = await this.dataSource.query('CALL getUnAssingmentInactive("'+query.startDate+'","'+query.endDate+'")');
    return result[0];
  }

  async getDob(query){
    const result = await this.dataSource.query('CALL getUnAssingmentDOB("'+query.startDate+'")');
    return result[0];
  }

  async getPack(query){
    const result = await this.dataSource.query('CALL getUnAssingmentPackageExpirySoon("'+query.startDate+'","'+query.endDate+'")');
    return result[0];
  }

  
  async getdue(query){
    const result = await this.dataSource.query('CALL getUnAssingmentdue("'+query.startDate+'","'+query.endDate+'")');
    return result[0];
  }


  async updateInactive(data){

    for(var i = 0; i<data.list.length;i++){
      if(data.list[i].reason && data.list[i].followup_date != ''){
      

       
       
      }
    }

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
