import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/Member.entity';
import { DataSource } from 'typeorm';
import { InActiveMember } from './entities/inActiveMember.entity';
import { log } from 'console';
import { Bmi } from './entities/bmi.entity';
import { HttpStatus } from '@nestjs/common';
import { Salary } from './entities/salary.entity';
import { CashTopUp } from './entities/cashtop.entity';
import { MemberExchanger } from './entities/memberExchanger.entity';

@Injectable()
export class MemberService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(InActiveMember)
    private inActiveMemberRepository: Repository<InActiveMember>,
    @InjectRepository(Bmi)
    private bmiRepository: Repository<Bmi>,
    @InjectRepository(MemberExchanger)
    private memberExchangerRepository: Repository<MemberExchanger>,
  ) {}

  // Create a new member
  async create(member: Member) {

    if(member.workoutType){
      member.workoutType = member.workoutType.toString()
    }

    if(member.fitnessGoal){
      member.fitnessGoal = member.fitnessGoal.toString()
    }
    console.log('aaaaaaaaaaMember', member.workoutType);

    // return this.memberRepository.save(member);
    const savedMember = await this.memberRepository.save(member);
    const savebmi = {
      member_id: savedMember.memberId,
      shoulders: savedMember.shoulders,
      arms: savedMember.arms,
      chest: savedMember.chest,
      abdomenUpper: savedMember.abdomenUpper,
      waist: savedMember.waist,
      abdomenLower: savedMember.abdomenLower,
      glute: savedMember.glute,
      thigh: savedMember.thigh,
      calf: savedMember.calf,
      height: savedMember.height,
      weight: savedMember.weight,
      date: new Date(),
    };

    return this.bmiRepository.save(savebmi);
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
    const lastMember: any = await this.memberRepository
      .createQueryBuilder('members')
      .orderBy('members.id', 'DESC')
      .getOne();

    let newCode: string;
    
    if (lastMember && lastMember.memberId) {
      // Extract the number part from the code (e.g., 'MEM001' -> 1)
      const lastCodeNumber = parseInt(
        lastMember.memberId.replace('MEM', ''),
        10,
      );
      console.log(lastCodeNumber);
      // Increment the number by 1 and format it as 'MEM' + zero-padded number
      newCode = `MEM${(lastCodeNumber + 1).toString().padStart(3, '0')}`;
    } else {
      // If there are no records, start from 'MEM001'
      newCode = 'MEM001';
    }

    return newCode;
  }

  async updateStatus(id: any, isActive: boolean) {
    console.log(id);
    const member: any = await this.memberRepository.findOne({
      where: { id: id },
    });
    if (!member) {
      throw new Error('Member not found');
    }

    member.isActive = isActive ? 1 : 0;
    console.log(member);
    return this.memberRepository.save(member);
  }

  async getinterstedIn(id: number) {
    const result = await this.dataSource.query('Call getPackageDurations(?)', [
      id,
    ]);
    console.log('result', result);
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
    const mappedMembers = body.inactiveMembers.map((member) => ({
      id: member.id,
      name: member.name,
      mobile: member.mobile,
      reason: member.reason,
      remark: member.remark,
      callBackDate: new Date(member.callBackDate),
      endDate: new Date(member.endDate),
      gender: member.gender,
      age: member.age,
      email: member.email,
    }));

    console.log('mappedMembers', mappedMembers);
    for (let i = 0; i < mappedMembers.length; i++) {
      console.log(mappedMembers[i]);
      const data = {
        member_id: mappedMembers[i].id,
        reason: mappedMembers[i].reason,
        remark: mappedMembers[i].remark,
        callBackDate: mappedMembers[i].callBackDate,
        endDate: mappedMembers[i].endDate,
        gender: mappedMembers[i].gender,
        age: mappedMembers[i].age,
        email: mappedMembers[i].email,
      };

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

  //   file Uploader

  async createbukupload(body) {
    console.log('body', body);

    const excelUpload = body.excelData;
    delete body.excelData;

    if (excelUpload && excelUpload.length > 0) {
      for (let i = 0; i < excelUpload.length; i++) {
        const excelRow = excelUpload[i];
        console.log('excelRow', excelRow);

        const member = {
          memberID: excelRow.memberID,
          name: excelRow.name,
          mobile: excelRow.mobile,
          email: excelRow['email '],
          age: excelRow.age,
          freezeStatus: excelRow.freezeStatus,
          gender: excelRow.gender,
          maritalStatus: excelRow.maritalStatus,
          shoulders: excelRow.shoulders,
          arms: excelRow.arms,
          chest: excelRow.chest,
          abdomenUpper: excelRow.abdomenUpper,
          waist: excelRow.waist,
          abdomenLower: excelRow.abdomenLower,
          glute: excelRow.glute,
          thigh: excelRow.thigh,
          calf: excelRow.calf,
          height: excelRow.height,
          weight: excelRow.weight,
          smoking: excelRow.smoking,
          alcohol: excelRow.alcohol,
          foodPreference: excelRow.foodPreference,
          fitnessGoal: excelRow.fitnessGoal,
          workoutType: excelRow.workoutType,
          billDate: excelRow.billDate,
          isActive: excelRow.isActive,
          packagePrice: excelRow.packagePrice,
          interestedIn: excelRow.interestedIn,
          dob: excelRow.dob,
          endDate: excelRow.endDate,
        };

        try {
          await this.memberRepository.save(member);
          console.log('Member saved:', member);
        } catch (error) {
          console.error('Error saving member:', error);
        }
      }
    } else {
      console.log('No data to process.');
    }
  }

  async cancel(body) {
    console.log('aaaabody', body);
    const member = await this.memberRepository.findOne({
      where: { id: body },
    });
    member.cancel = 1;
    await this.memberRepository.save(member);
    return body;
  }

  async getBmiList() {
    const result = await this.dataSource.query('CALL getBmiList()');
    return result[0];
  }

  // async saveBmiDate(body) {
  //   const dateObj = new Date(body.date);
  //   const formattedDate = dateObj.toLocaleDateString('en-CA');
  //   console.log('formattedDate:', formattedDate);
  //
  //   const existingBmi = await this.bmiRepository
  //     .createQueryBuilder('bmi')
  //     .where(
  //       'bmi.member_id = :memberId AND DATE_FORMAT(bmi.date, "%Y-%m-%d") = :formattedDate',
  //       { memberId: body.member_id, formattedDate: formattedDate },
  //     )
  //     .getOne();
  //
  //   if (existingBmi) {
  //     throw new HttpException(
  //       {
  //         status: false,
  //         message: 'Data for this member and date already exists.',
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //     return false;
  //   } else {
  //     const newBmiData = {
  //       date: dateObj,
  //       weight: body.weight,
  //       height: body.height,
  //       calf: body.calf,
  //       thigh: body.thigh,
  //       abdomenLower: body.abdomenLower,
  //       abdomenUpper: body.abdomenUpper,
  //       chest: body.chest,
  //       arms: body.arms,
  //       shoulders: body.shoulders,
  //       member_id: body.member_id,
  //     };
  //     console.log('newBmiData', newBmiData);
  //     const details = await this.bmiRepository.save(newBmiData);
  //     return details;
  //   }
  // }

  async saveBmiDate(body) {
    const dateObj = new Date(body.date);
    const formattedDate = dateObj.toLocaleDateString('en-CA'); // Formats as YYYY-MM-DD
    console.log('formattedDate:', formattedDate);

    const existingBmi = await this.bmiRepository
      .createQueryBuilder('bmi')
      .where(
        'bmi.member_id = :memberId AND DATE(bmi.date) = :formattedDate', // Use DATE() to ignore time
        { memberId: body.member_id, formattedDate: formattedDate },
      )
      .getOne();

    if (existingBmi) {
      throw new HttpException(
        {
          status: false,
          message: 'Date for this member and date already exists.',
        },
        HttpStatus.BAD_REQUEST,
      );
      return false;
    } else {
      const newBmiData = {
        date: dateObj,
        weight: body.weight,
        height: body.height,
        calf: body.calf,
        thigh: body.thigh,
        abdomenLower: body.abdomenLower,
        abdomenUpper: body.abdomenUpper,
        chest: body.chest,
        arms: body.arms,
        shoulders: body.shoulders,
        member_id: body.member_id,
      };
      console.log('newBmiData', newBmiData);
      const details = await this.bmiRepository.save(newBmiData);
      return details;
    }
  }

  async updatebmistatus(id: any, isActive: boolean) {
    console.log(id);
    const exerciseType: any = await this.bmiRepository.findOne({
      where: { id: id },
    });
    if (!exerciseType) {
      throw new Error('exerciseType not found');
    }

    exerciseType.isActive = isActive ? 1 : 0;

    return this.bmiRepository.save(exerciseType);
  }

  async bmiDelete(id: number): Promise<void> {
    await this.bmiRepository.delete(id);
  }

  async bmiAll() {
    const result = await this.dataSource.query('CALL getAllBmiData()');
    return result[0];
  }

  async bmifindOne(id: number) {
    const result = await this.dataSource.query('Call getbmifindOne(?)', [id]);
    console.log('result', result);
    return result[0][0];
  }

  //   exchanger

  async exchangerAdd(body) {
    try {
      console.log('memberExcahngeraajajaj', body);
      const exchangerSave = await this.memberExchangerRepository.save(body);
      const memberUpdated = await this.memberRepository.findOne({
        where:{memberId: body.memberId}
      })
      console.log('memberUpdated',memberUpdated)
       if(memberUpdated){
         exchangerSave.updated_name = memberUpdated.name;
       } else {
         throw new Error('Member not found');
       }
      await this.memberRepository.save(exchangerSave);





      return body;
    } catch (error) {
      console.error('Error saving ', error);
      throw new Error('Failed to save');
    }
  }

  async updateExchanger(body) {
    try {
      const updateExchanger = await this.memberExchangerRepository.update(
        { id: body.id },
        body,
      );
      return updateExchanger;
    } catch (error) {
      console.error('Error updating Withdrawal', error);
      throw new Error('Failed to updating Withdrawal');
    }
  }

  async exchangerfindOne(id: number): Promise<MemberExchanger> {
    return await this.memberExchangerRepository.findOne({ where: { id } });
  }

  async exchangerfindAll(): Promise<CashTopUp[]> {
    const result = await this.dataSource.query('CALL getAllSalaryList()');
    return result[0];
  }

  async exchangerdelete(id: number): Promise<void> {
    await this.memberExchangerRepository.delete(id);
  }

  // status

  async exchangerstatus(id: any, isActive: boolean) {
    console.log(id);
    const exchanger: any = await this.memberExchangerRepository.findOne({
      where: { id: id },
    });
    if (!exchanger) {
      throw new Error('exchanger not found');
    }

    exchanger.isActive = isActive ? 1 : 0;

    return this.memberExchangerRepository.save(exchanger);
  }
}
