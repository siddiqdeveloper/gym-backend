import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,DataSource } from 'typeorm';
import { Package } from './entities/Package.entity';


@Injectable()
export class PackageService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
  ) {}

  async create(createPackageDto) {
    const newPackage = this.packageRepository.create(createPackageDto);
    return await this.packageRepository.save(newPackage);
  }

  async findAll() {
   
    return await this.packageRepository.find();
  }

  // async findOne(id) {
  //   return await this.packageRepository.findOne(id);
  // }

  async findOne(id) {
    const result = await this.dataSource.query(
        'Call getPackageData(' + id + ')',
        [],
    );
    if (result) {
      return result[0][0];
    }
  }


  async update(id: number, updatePackageDto) {
    await this.packageRepository.update(id, updatePackageDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.packageRepository.delete(id);
  }
  async findAllActive() {
    return await this.packageRepository.find({
      where: { isActive: 1 }, // Assuming 'isActive' is the column that denotes active status
    });
  }


  
  async updatePackageStatus(id: any, isActive: boolean) {
    console.log(id)
    let packageStatus:any = await this.packageRepository.findOne({where:{id:id}});
    if (!packageStatus) {
      throw new Error('package not found');
    }
   
    packageStatus.isActive = isActive?1:0;
    console.log(packageStatus)
    return this.packageRepository.save(packageStatus);
  }
  
}
