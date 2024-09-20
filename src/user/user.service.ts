import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email: email } });
  }

  async createNewUser(payload: any) {
    return await this.userRepo.save(payload);
  }



  async getUserInfo(email) {
    let d: any = await this.userRepo.findOne({
      where: {
        email: email
      }
    });

    return d;
  }


}
