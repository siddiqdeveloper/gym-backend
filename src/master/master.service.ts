import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailTemplate } from 'src/entities/email-template.entity';
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
     @InjectRepository(EmailTemplate)
        private readonly emailTemplateRepository: Repository<EmailTemplate>,
  
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

  // Email Templates Configuration
  async createEmailTemplate(createEmailTemplateDto) {
    const newPackage = this.emailTemplateRepository.create(createEmailTemplateDto);
    console.log(newPackage,'NPGS')
    return await this.emailTemplateRepository.save(newPackage);
  }

  async findAllEmailTemplate() {
   
    return await this.emailTemplateRepository.find();
  }

  // async findOne(id) {
  //   return await this.emailTemplateRepository.findOne(id);
  // }

  async findOneEmailTemplate(id) {

    const result =  await this.emailTemplateRepository.findOne({where:{id:id}});
    return result;
  }


  async updateEmailTemplate(id: number, updatePackageDto) {
    await this.emailTemplateRepository.update(id, updatePackageDto);
    return this.emailTemplateRepository.findOne({where:{id:id}});
  }

  async removeEmailTemplate(id: number) {
    await this.emailTemplateRepository.delete(id);
  }
  async findAllActiveEmailTemplate() {
    return await this.emailTemplateRepository.find({
      where: { isActive: 1 }, // Assuming 'isActive' is the column that denotes active status
    });
  }


  
  async updateEmailTemplateStatus(id: any, isActive: boolean) {
    console.log(id)
    let emaailTemplateData:any = await this.emailTemplateRepository.findOne({where:{id:id}});
    if (!emaailTemplateData) {
      throw new Error('Email Template not found');
    }
   
    emaailTemplateData.isActive = isActive?1:0;
    console.log(emaailTemplateData)
    return this.emailTemplateRepository.save(emaailTemplateData);
  }



}
