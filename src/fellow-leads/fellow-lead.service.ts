import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,Not } from 'typeorm';
import { FollowLead } from '../entities/follow-lead.entity';  
import { DataSource } from 'typeorm';
import { Lead } from 'src/entities/Lead.entity';
import { ContinuesAssignment } from 'src/entities/continuesAssignment.entity';
import { FollowupContinue } from 'src/entities/follow-continue.entity';
import { InactiveAssignment } from 'src/entities/inactiveAssignment,entity';
import { DOBAssignment } from 'src/entities/DOBAssignment.entity';
import { PackageExpiryAssignment } from 'src/entities/PackageExpiryAssignment.entity';
import { leadsAssignment } from 'src/entities/leadsAssignment.entity';
import { FollowupPackageExpriy } from 'src/entities/followu-package-expriy.entity';
import { FollowupDOB } from 'src/entities/follow-dob.entity';
import { FollowupDue } from 'src/entities/follow-due.entity';
import { FollowupInActive } from 'src/entities/follow-inactive.entity';
import { DueAssignment } from 'src/entities/DueAssignment.entity';
import { FollowupReason } from 'src/entities/follow-reason.entity';
import { BlockMembers } from 'src/entities/blockMemebers.entity';

@Injectable()
export class FellowLeadService {
  constructor(
    @InjectRepository(FollowLead)
    private fellowLeadRep: Repository<FollowLead>,
    @InjectRepository(FollowupDue)
    private followupDueRep: Repository<FollowupDue>,
    @InjectRepository(FollowupInActive)
    private followupInActiveRep: Repository<FollowupInActive>,
    @InjectRepository(FollowupReason)
    private readonly followupReasonRepo: Repository<FollowupReason>,

    @InjectRepository(FollowupContinue)
    private followupContinueRep: Repository<FollowupContinue>,
    @InjectRepository(FollowupPackageExpriy)
    private followupPackageExpriyRep: Repository<FollowupPackageExpriy>,
    @InjectRepository(FollowupDOB)
    private followupDOBRep: Repository<FollowupDOB>,
    @InjectRepository(InactiveAssignment)
    private inactiveAssignmentRep: Repository<InactiveAssignment>,
    @InjectRepository(Lead)
    private leadRep: Repository<Lead>,
    @InjectRepository(ContinuesAssignment)
    private continuesAssignmentRep: Repository<ContinuesAssignment>,
    @InjectRepository(DOBAssignment)
    private DOBAssignmentRep: Repository<DOBAssignment>,
    @InjectRepository(PackageExpiryAssignment)
    private packageExpiryAssignmentRep: Repository<PackageExpiryAssignment>,
    @InjectRepository(leadsAssignment)
    private leadsAssignmentRep: Repository<leadsAssignment>,
    @InjectRepository(DueAssignment)
    private dueAssignmentRep: Repository<DueAssignment>,
    @InjectRepository(BlockMembers)
    private blockMembersRep: Repository<BlockMembers>,

    

    

    
    private dataSource: DataSource, 

  ) {}

  async unassignupdate(data){
    console.log(data)

    for(var i = 0; i<data.list.length;i++){
       
        if(data.process == 'leads'){
          await this.leadsAssignmentRep.insert({assignDate:data.assignDate,staff_id:data.list[i].assignmentStaff,lead_id:data.list[i].id})
        }

        if(data.process == 'ca'){
          await this.continuesAssignmentRep.insert({assignDate:data.assignDate,member_code:data.list[i].memberId,member_id:data.list[i].id,staff_id:data.list[i].assignmentStaff})
        }

        if(data.process == 'inactive'){
          await this.inactiveAssignmentRep.insert({assignDate:data.assignDate,member_code:data.list[i].memberId,member_id:data.list[i].id,staff_id:data.list[i].assignmentStaff})
        
        }

        if(data.process == 'dob'){
          await this.DOBAssignmentRep.insert({assignDate:data.assignDate,member_code:data.list[i].memberId,member_id:data.list[i].id,staff_id:data.list[i].assignmentStaff})
        
        }

        if(data.process == 'pack'){
          await this.packageExpiryAssignmentRep.insert({assignDate:data.assignDate,member_code:data.list[i].memberId,member_id:data.list[i].id,staff_id:data.list[i].assignmentStaff})
        
        }

        if(data.process == 'due'){
          await this.dueAssignmentRep.insert({assignDate:data.assignDate,member_code:data.list[i].memberId,member_id:data.list[i].id,staff_id:data.list[i].assignmentStaff})
        
        }


        

      }
    }



  async updateLeads(data){

    if(data.process == 'dob'){

      for(var i = 0; i<data.list.length;i++){
        if(data.list[i].reason != ''){

   

            let check =  await this.followupDOBRep.findOne({where:{followup_date:data.date,member_id:data.list[i].member_id}});
           
            if(!check){
              data.list[i].followup_date = data.date;
              if(data.list[i].callback_date == ''){
                 data.list[i].callback_date = null;
              }
              delete data.list[i].id
              await this.followupDOBRep.save(data.list[i]);
            }else{
              await this.followupDOBRep.update(check.id, data.list[i]);

            }

          }
            
         
      }

    }else{
      for(var i = 0; i<data.list.length;i++){

        if( data.list[i].reason != ''){
  
        
          if(data.process == 'leads'){
            let check =  await this.fellowLeadRep.findOne({where:{followup_date:data.date,lead_id:data.list[i].lead_id}});
          
            if(!check){
              data.list[i].followup_date = data.date;
              if(data.list[i].callback_date == ''){
                 data.list[i].callback_date = null;
              }
              delete data.list[i].id
              await this.fellowLeadRep.save(data.list[i]);
            }else{
              await this.fellowLeadRep.update(check.id, data.list[i]);

            }
          }
         
    
          if(data.process == 'continue'){
  
            let check =  await this.followupContinueRep.findOne({where:{followup_date:data.date,member_id:data.list[i].member_id}});
           
            if(!check){
              data.list[i].followup_date = data.date;
              if(data.list[i].callback_date == ''){
                 data.list[i].callback_date = null;
              }
              delete data.list[i].id
              await this.followupContinueRep.save(data.list[i]);
            }else{
              await this.followupContinueRep.update(check.id, data.list[i]);

            }
            
          }
  
  
          if(data.process == 'pack'){
  
            let check =  await this.followupPackageExpriyRep.findOne({where:{followup_date:data.date,member_id:data.list[i].member_id}});
           
            if(!check){
              data.list[i].followup_date = data.date;
              if(data.list[i].callback_date == ''){
                 data.list[i].callback_date = null;
              }
              delete data.list[i].id
              await this.followupPackageExpriyRep.save(data.list[i]);
            }else{
              await this.followupPackageExpriyRep.update(check.id, data.list[i]);
            }
            
          }
          console.log(data.process);
  
          if(data.process == 'dob'){
        
            let check =  await this.followupDOBRep.findOne({where:{followup_date:data.date,member_id:data.list[i].member_id}});
           
            if(!check){
              data.list[i].followup_date = data.date;
              if(data.list[i].callback_date == ''){
                 data.list[i].callback_date = null;
              }
              delete data.list[i].id
              await this.followupDOBRep.save(data.list[i]);
            }else{
              await this.followupDOBRep.update(check.id, data.list[i]);
            }
            
          }


          if(data.process == 'due'){
        
            let check =  await this.followupDueRep.findOne({where:{followup_date:data.date,member_id:data.list[i].member_id}});
           
            if(!check){
              data.list[i].followup_date = data.date;
              if(data.list[i].callback_date == ''){
                 data.list[i].callback_date = null;
              }
              delete data.list[i].id
              await this.followupDueRep.save(data.list[i]);
            }else{
              await this.followupDueRep.update(check.id, data.list[i]);
            }
            
          }

        
          if(data.process == 'inactive'){
        
            let check =  await this.followupInActiveRep.findOne({where:{followup_date:data.date,member_id:data.list[i].member_id}});
           
            if(!check){
              data.list[i].followup_date = data.date;
              if(data.list[i].callback_date == ''){
                 data.list[i].callback_date = null;
              }
              delete data.list[i].id
              await this.followupInActiveRep.save(data.list[i]);
            }else{
              console.log(check.id);
              delete data.list[i].id;
              delete data.list[i].memberId; 

              let update:any = {
                followup_date: data.date,
                callback_date: data.list[i].callback_date,
                member_id: data.list[i].member_id,
                reason: data.list[i].reason ,
                remarks: data.list[i].remarks,
                staff_id: data.list[i].staff_id 
               }
              let d = await this.followupInActiveRep.update(check.id, update);
              console.log(d);
            }
            
          }






          





        
         
        }
      }
  


    }

   
  }


  // Fetch fellow leads by a specific date
  async findByDate(date: any,assignDate:any) {
    const result = await this.dataSource.query('CALL getFellowupLead(?)',[date]);
    console.log()
    return result[0];
 
  }

  async getFellowLeadsContinueabsendByDate(date: any,assignDate:any) {
   
    const result = await this.dataSource.query('CALL getFellowupContinue(?)',[date]);
  
    return result[0];
 
  }






  async getFollowupInActive(date: any,assignDate:any) {
    const result = await this.dataSource.query('CALL followupInActive(?)',[date]);
    console.log()
    return result[0];

  }

  async findByDateDOB(date: any,assignDate:any) {
    const result = await this.dataSource.query('CALL getFellowupDOB(?)',[date]);
    console.log()
    return result[0];
 
  }



  async getPackageExpiry(count:any){
    const result = await this.dataSource.query('CALL getPackagesExpried(?)',[count]);
    return result[0];

  }

  async getUnassignment(query){
    const result = await this.dataSource.query('CALL getunassignmentLeads("'+query.startDate+'","'+query.endDate+'")');
    return result[0];
  }

  async getDashbaordSummary(query: { startDate: string; endDate: string }) {

    console.log('CALL GetFollowupDashboardData("'+query.startDate+'","'+query.endDate+'")')
    const result = await this.dataSource.query(
      'CALL GetFollowupDashboardData(?, ?)',
      [query.startDate, query.endDate]
    );

    return {staffPerformance:result[0],
    reasonsSummary:result[1],
    continuePerformance:result[2],
    continueReasonsSummary:result[3],
    inactivePerformance:result[4],
    inactiveReasonsSummary:result[5],
    duePaymentPerformance:result[6],
    duePaymentReasonsSummary:result[7],
    packageExpiryPerformance:result[8],
    packageExpiryReasonsSummary:result[9],
    dobPerformance:result[10],
    dobReasonsSummary:result[11]}
   
  }
  async getInActiveLeads(){
    const result = await this.dataSource.query('CALL getNotActiveFellowupLeads()');
    return result[0];
  }

  async summaryReasondata(data){
    console.log(data);
    let result = []
    if(data.type  == 'continuous absent'){
        result = await this.dataSource.query('CALL casummaryReasondata(?)',[data.reason]);
    }
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

   async getInactiveBill(query){
    const result = await this.dataSource.query('CALL getInactiveBill("'+query.startDate+'","'+query.endDate+'")');
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

    
  async AssignedDue(date,assignDate:any){
    const result = await this.dataSource.query('CALL getFellowupDue("'+date+'")');
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
      return {msg:'fellow not found'};
    }
   
    fellow.isActive = isActive?1:0;
    console.log(fellow)
    return this.fellowLeadRep.save(fellow);
  }

  async getFellowPackageExpriy(date: any,assignDate:any) {
    const result = await this.dataSource.query('CALL getFellowupPackageExpriy(?)',[date]);
    console.log()
    return result[0];
 
  }


  async createFollowupReason(body: any) {
    const { reasonName, type,process } = body;

    const existing = await this.followupReasonRepo.findOne({
      where: { reasonName },
    });

    if (existing) {
      return {msg:'Reason name already'};
    }

    const newReason =  this.followupReasonRepo.create({
      reasonName,
      type: type,
      process: process,
      isActive: 1,
    });

    return await this.followupReasonRepo.save(newReason);
  }

  async updateFollowupReason(body: any) {
    const { id, reasonName, selectType } = body;

    const existing = await this.followupReasonRepo.findOne({
      where: {
        reasonName,
        id: Not(id),
      },
    });

    if (existing) {
      return {msg:'Reason name already'};
    }

    const reason = await this.followupReasonRepo.findOne({ where: { id } });

    if (!reason) {
      return {msg:'Reason not found'};
    }

    reason.reasonName = reasonName;
    reason.type = selectType;

    return await this.followupReasonRepo.save(reason);
  }


  async addFollowupBlock(body){
    const details = await this.blockMembersRep.save(body);
    return details;


  }

  async followupBlockList(){
    const result = await this.dataSource.query('CALL getBlockListMembers(?)',['leads']);
 
    return result[0];

  }

  async getFollowupReasonById(id: number) {
    const reason = await this.followupReasonRepo.findOne({ where: { id } });

    if (!reason) {
      return {msg:'Reason not found'};
    }

    return reason;
  }

  async getAllFollowupReasons() {
    return await this.followupReasonRepo.find({
      order: { id: 'DESC' },
    });
  }

  async toggleFollowupReasonStatus(id: number) {
    const reason = await this.followupReasonRepo.findOne({ where: { id } });

    if (!reason) {
      return {msg:'Reason not found'};
    }

    reason.isActive = reason.isActive ? 1 : 0;
    return await this.followupReasonRepo.save(reason);
  }

  async softDeleteFollowupReason(id: number) {
    const reason = await this.followupReasonRepo.findOne({ where: { id } });

    if (!reason) {
      return {msg:'Reason not found'};
    }

    return await this.followupReasonRepo.softDelete(id);
  }
}
