import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';


@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  async createStaff(createStaffDto, files: any) {
    let staff = createStaffDto;
    if (files) {
      if (files.staffPhoto) {
        staff.staffPhoto = files.staffPhoto[0].path; // Assuming the file path is saved
      }

      if (files.resume) {
        staff.resume = files.resume[0].path; // Save resume file path
      }

      if (files.otherDocuments) {
        staff.otherDocuments = files.otherDocuments.map(file => file.path); // Map multiple file paths for otherDocuments
      }
    }

    return await this.staffRepository.save(staff);
  }



  async updateStatus(id: any, isActive: boolean) {
    console.log(id)
    let status:any = await this.staffRepository.findOne({where:{id:id}});
    if (!status) {
      throw new Error('status not found');
    }
   
    status.isActive = isActive?1:0;
    console.log(status)
    return this.staffRepository.save(status);
  }


  findAll() {
    return this.staffRepository.find();
  }
}
