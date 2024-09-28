import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './entities/Package.entity';


@Injectable()
export class PackageService {
  constructor(
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

  async findOne(id) {
    return await this.packageRepository.findOne(id);
  }

  async update(id: number, updatePackageDto) {
    await this.packageRepository.update(id, updatePackageDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.packageRepository.delete(id);
  }
}
