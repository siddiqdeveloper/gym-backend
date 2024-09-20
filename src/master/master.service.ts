import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DataSource, Repository } from 'typeorm';


export enum UserType {
  'ADMIN' = 'admin',
  'USER' = 'user',
  'EMPLOYEE' = 'employee',
  'TECHNICIAN' = 'technician',
}

@Injectable()
export class MasterService {
  private metaData: any;

  constructor(
    private readonly cn: Connection,
  
  ) {}


}
