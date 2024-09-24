import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PackageService } from './package.service';

@Controller('packages')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  async create(@Body() createPackageDto) {
    return this.packageService.create(createPackageDto);
  }

  @Get()
  async findAll(){
    return this.packageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.packageService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePackageDto) {
    return this.packageService.update(id, updatePackageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.packageService.remove(id);
  }
}
