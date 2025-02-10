import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255})
  collectedBy: string;

  @Column({ type: 'decimal', precision: 10, scale: 2})
  discountAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2})
  due: number;

  @Column({ type: 'int'})
  durationInDays: number;

  @Column({ type: 'decimal', precision: 10, scale: 2})
  emi: number;

  @Column({ type: 'date'})
  feePaymentDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2})
  incentiveIncurred: number;

  @Column({ type: 'decimal', precision: 5, scale: 2})
  interestRate: number;

  @Column({ type: 'decimal', precision: 10, scale: 2})
  internetAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2})
  loanAmount: number;

  @Column({ type: 'int' })
  memberId: number;

  @Column({ type: 'enum', enum: ['NEW', 'RENEWAL', 'REFUND'] })
  memberPaymentFor: 'NEW' | 'RENEWAL';

  @Column({ type: 'varchar', length: 255})
  memberState: string;

  @Column({
    type: 'enum',
    enum: [
      'CASH',
      'G PAY',
      'CARD+CASH',
      'CARD+G PAY',
      'Cheque',
      'IMPS/NEFT/RTGS',
      'Others',
    ],
  })
  modeOfPayment:
    | 'CASH'
    | 'G PAY'
    | 'CARD+CASH'
    | 'CARD+G PAY'
    | 'Cheque'
    | 'IMPS/NEFT/RTGS'
    | 'Others';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  packageAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2})
  pendingAmount: number;

  @Column({ type: 'date'})
  pendingAmountDate: Date;

  @Column({ type: 'varchar', length: 255})
  pendingApprovedBy: string;

  @Column({ type: 'varchar', length: 255})
  paidAmount: string;

  @Column({ type: 'varchar', length: 255})
  totalAmount: string;

  @Column({ type: 'varchar', length: 255})
  gst_percentage: string;

  @Column({ type: 'varchar', length: 255})
  registration_fees: string;

  @Column({ type: 'varchar', length: 255})
  enterTrainerPercentage: string;

  @Column({ type: 'varchar', length: 255})
  totalMonth: string;

  @Column({ type: 'varchar', length: 255})
  eachMonthAmount: string;

  @Column({ type: 'varchar', length: 255})
  officeTotalAmount: string;

  @Column({ type: 'boolean'})
  rejoinMember: boolean;

  @Column({ type: 'text'})
  remarks: string;

  @Column({ type: 'int'})
  tenure: number;

  @Column({ type: 'varchar', length: 255})
  trainerName: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'tinyint', default: 1 })
  isActive: number;

  @Column({ type: 'varchar', length: 255})
  CASH: string;

  @Column({ type: 'varchar', length: 255})
  UPI: string;

  @Column({ type: 'varchar', length: 255})
  CARD: string;

  @Column({ type: 'varchar', length: 255})
  cheque: string;

  @Column({ type: 'varchar', length: 255})
  IMPS: string;

  @Column({ type: 'varchar', length: 255})
  NEFT: string;

  @Column({ type: 'varchar', length: 255})
  RTGS: string;
}
