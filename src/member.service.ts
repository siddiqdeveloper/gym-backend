import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/Member.entity';
import { DataSource } from 'typeorm';
import { InActiveMember } from './entities/inActiveMember.entity';
import { log } from 'console';


@Injectable()
export class MemberService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(InActiveMember)
    private inActiveMemberRepository: Repository<InActiveMember>,
  ) {}

  // Create a new member
  create(member: Member) {
    return this.memberRepository.save(member);
  }

  // Get all members
  async findAll() {
    // return this.memberRepository.find();

    const result = await this.dataSource.query('CALL getmemberList()');
   
    return result[0];
  }

  // Get a single member by ID
 

  // async findOne(id: any) {
   
  //   const member = await this.memberRepository.findOne({ where: { id } });
  //   return member; 
  // }

  
  async findOne(id) {
    const result = await this.dataSource.query(
        'Call getMembersData(' + id + ')',
        [],
    );
    if (result) {
      return result[0][0];
    }
  }




  // Update a member
  async update(id: any, member) {
    await this.memberRepository.update(id, member);
    return this.findOne(id);
  }

  // Delete a member
  async remove(id: any) {
    await this.memberRepository.softDelete(id);
  }

  async generateMemberCode(): Promise<string> {
    // Find the member with the highest code
    const lastMember:any = await this.memberRepository
      .createQueryBuilder('members')
      .orderBy('members.id', 'DESC')
      .getOne();

    let newCode: string;

    if (lastMember && lastMember.memberId) {
      // Extract the number part from the code (e.g., 'MEM001' -> 1)
      const lastCodeNumber = parseInt(lastMember.memberId.replace('MEM', ''), 10);
      console.log(lastCodeNumber)
      // Increment the number by 1 and format it as 'MEM' + zero-padded number
      newCode = `MEM${(lastCodeNumber + 1).toString().padStart(3, '0')}`;
    } else {
      // If there are no records, start from 'MEM001'
      newCode = 'MEM001';
    }

    return newCode;
  }

  async updateStatus(id: any, isActive: boolean) {
    console.log(id)
    let member:any = await this.memberRepository.findOne({where:{id:id}});
    if (!member) {
      throw new Error('Member not found');
    }
   
    member.isActive = isActive?1:0;
    console.log(member)
    return this.memberRepository.save(member);
  }


  async getinterstedIn(id: number) {
    const result = await this.dataSource.query(
      'Call getPackageDurations(?)', [id] 
    );
    console.log('result',result)
    return result[0][0]; 
     
  }



  async getInActiveMember(endDate) {
   endDate = "'" + endDate + "'";
  const result = await this.dataSource.query(
      'Call getInActiveMember(' + endDate + ')',

      [],
    );
    if (result) {
      const data = result[0];
      return data;
    }
  }






  // inActive member 

  createInActiveMember(body) {
  
    
    const mappedMembers = body.inactiveMembers.map(member => ({
      id: member.id,
      name: member.name,
      mobile: member.mobile,
      reason: member.reason,
      remark: member.remark,
      callBackDate: new Date(member.callBackDate),
      endDate: new Date(member.endDate),
      gender: member.gender,
      age: member.age,
      email:member.email,
    }));


    console.log('mappedMembers',mappedMembers);
    for(let i=0;i<mappedMembers.length;i++){
      console.log(mappedMembers[i])
      const data = {
        member_id : mappedMembers[i].id,
        reason : mappedMembers[i].reason,
        remark : mappedMembers[i].remark,
        callBackDate: mappedMembers[i].callBackDate,
        endDate: mappedMembers[i].endDate,
        gender: mappedMembers[i].gender,
        age: mappedMembers[i].age,
        email:mappedMembers[i].email,
      }

      return this.inActiveMemberRepository.save(data);
    }
   
   
  }






  // async getMemberPaymentDetails(id: number) {
  //   id = "'" + id + "'";
  //   const result = await this.dataSource.query(
  //     'Call getMemberPaymentDetails(?)', 
  //     [id] 
  //   );
  //   if (result) {
  //     return result[0][0];  
  //   return null; 
  // }
  
  // }

  async getMemberPaymentDetails(id) {
    id = "'" + id + "'";
    const result = await this.dataSource.query(
      'Call getMemberPaymentDetails(' + id + ')',
      [],
    );
    return result[0][0];
  }

  


  async duePaymentList(memberId) {
    memberId = "'" + memberId + "'";
   const result = await this.dataSource.query(
       'Call duePaymentList(' + memberId + ')',
 
       [],
     );
     if (result) {
       const data = result[0];
       return data;
     }
   }



  

}
