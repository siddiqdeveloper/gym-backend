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
    await this.memberRepository.delete(id);
  }
}
