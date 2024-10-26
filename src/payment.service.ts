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
    const payment = this.paymentRepository.create(createPaymentDto);  // Create an instance of the Payment entity
    return this.paymentRepository.save(payment);  // Save the payment record to the database
  }

  async findAll() {
    const result = await this.dataSource.query('CALL getAllPayments()');
    console.log()
    return result[0];
  }

}
