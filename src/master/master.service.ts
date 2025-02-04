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
    public dataSource:DataSource,
    private readonly cn: Connection,
  
  ) {}

  async fetchCode(query): Promise<string> {

      let lastMember:any =  await this.dataSource.query('select * from '+query.t+' order by id desc limit 1 ');
      if(lastMember){
        lastMember = lastMember[0];
      }

      const prefix = query.prefix;

    let newCode: string;

    console.log(lastMember);

    if (lastMember && lastMember.memberId) {
      // Extract the number part from the code (e.g., 'MEM001' -> 1)
      const lastCodeNumber = parseInt(lastMember.memberId.replace(prefix, ''), 10);
      console.log(lastCodeNumber)
      // Increment the number by 1 and format it as 'MEM' + zero-padded number
      newCode = prefix+`${(lastCodeNumber + 1).toString().padStart(3, '0')}`;
    } else {
      // If there are no records, start from 'MEM001'
      newCode = 'MEM001';
    }

    return newCode;
  }


}
