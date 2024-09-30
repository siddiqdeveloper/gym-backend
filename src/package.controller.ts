import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { PackageService } from './package.service';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  async create(@Body() createPackageDto) {
    try {
      const data = await this.packageService.create(createPackageDto);
      return {
        status: true,
        message: 'Package created successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException({
        status: false,
        message: 'Failed to create package',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('all')
  async findAll() {
    try {
      const data = await this.packageService.findAll();
      return {
        status: true,
        message: 'Packages retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException({
        status: false,
        message: 'Failed to fetch all packages',
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get/:id')
  async findOne(@Param('id') id: number) {
    try {
      const data = await this.packageService.findOne(id);
      if (!data) {
        throw new HttpException({
          status: false,
          message: 'Package not found',
        }, HttpStatus.NOT_FOUND);
      }
      return {
        status: true,
        message: 'Package retrieved successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException({
        status: false,
        message: 'Failed to fetch package',
        error: error.message,
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Put('update/:id')
  async update(@Param('id') id: number, @Body() updatePackageDto) {
    try {
      const data = await this.packageService.update(id, updatePackageDto);
      return {
        status: true,
        message: 'Package updated successfully',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException({
        status: false,
        message: 'Failed to update package',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number) {
    try {
      await this.packageService.remove(id);
      return {
        status: true,
        message: 'Package deleted successfully',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException({
        status: false,
        message: 'Failed to delete package',
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('all/active')
async findAllActive() {
  try {
    const data = await this.packageService.findAllActive();
    return {
      status: true,
      message: 'Active packages retrieved successfully',
      data: data,
    };
  } catch (error) {
    console.log(error);
    throw new HttpException({
      status: false,
      message: 'Failed to fetch active packages',
      error: error.message,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
}
