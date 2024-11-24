import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Payment } from './entities/Payment';

@Injectable()
export class PaymentService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async createPayment(createPaymentDto) {
    const payment = this.paymentRepository.create(createPaymentDto);  
    return this.paymentRepository.save(payment);  
  }

  async findAll() {
    // const result = await this.dataSource.query('CALL getAllPayments()');
    // console.log()
    // return result[0];
    return this.paymentRepository.find();
  }



  async updateStatus(id: any, isActive: boolean) {
    console.log(id)
    let payment:any = await this.paymentRepository.findOne({where:{id:id}});
    if (!payment) {
      throw new Error('payment not found');
    }
   
    payment.isActive = isActive?1:0;
    console.log(payment)
    return this.paymentRepository.save(payment);
  }
  async remove(id: any) {
    await this.paymentRepository.softDelete(id);
  }


  async updatePayments(body) {
    try {
    const updatePayments = await this.paymentRepository.update({id:body.id},body)
     return updatePayments
    } catch(error) {
        console.error('Error updating updatePayments', error);
        throw new Error('Failed to  updatePayments');
    }
}



async findOne(id) {
  const result = await this.dataSource.query(
      'CALL getPaymentData(?)', // Use parameterized query
      [id],
  );
  if (result && result[0] && result[0][0]) {
      return result[0][0];
  } else {
      throw new Error('No data found for this ID'); // Handle no data case
  }
}



}
