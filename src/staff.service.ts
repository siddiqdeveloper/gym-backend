import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';


@Injectable()
export class StaffService {
  constructor(
    private dataSource: DataSource,
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

      if (staff.dateOfBirth) {
        staff.dateOfBirth = this.formatDateForMySQL(staff.dateOfBirth);
      }

      if (staff.dateOfJoining) {
        staff.dateOfJoining  = this.formatDateForMySQL(staff.dateOfJoining); 
      }
    }

    return await this.staffRepository.save(staff);
  }

  formatDateForMySQL(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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


  async findOne(id) {
    const result = await this.dataSource.query(
        'Call getStaffDatas(' + id + ')',
        [],
    );
    if (result) {
      return result[0][0];
    }
  }


  async remove(id: any) {
    await this.staffRepository.softDelete(id);
  }
}
