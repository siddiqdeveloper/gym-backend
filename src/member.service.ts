import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/Member.entity';


@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  // Create a new member
  create(member: Member) {
    return this.memberRepository.save(member);
  }

  // Get all members
  findAll() {
    return this.memberRepository.find();
  }

  // Get a single member by ID
  findOne(id: number) {
    return this.memberRepository.findOneBy({ id });
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
}
