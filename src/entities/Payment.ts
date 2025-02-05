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

  @Column({ type: 'varchar', length: 255, nullable: true })
  collectedBy: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discountAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  due: number;

  @Column({ type: 'int', nullable: true })
  durationInDays: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  emi: number;

  @Column({ type: 'date', nullable: true })
  feePaymentDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  incentiveIncurred: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  interestRate: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  internetAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  loanAmount: number;

  @Column({ type: 'int' })
  memberId: number;

  @Column({ type: 'enum', enum: ['NEW', 'RENEWAL', 'REFUND'] })
  memberPaymentFor: 'NEW' | 'RENEWAL';

  @Column({ type: 'varchar', length: 255, nullable: true })
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

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  pendingAmount: number;

  @Column({ type: 'date', nullable: true })
  pendingAmountDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pendingApprovedBy: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  paidAmount: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  totalAmount: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  gst_percentage: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  registration_fees: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  enterTrainerPercentage: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  totalMonth: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  eachMonthAmount: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  officeTotalAmount: string;

  @Column({ type: 'boolean', nullable: true })
  rejoinMember: boolean;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @Column({ type: 'int', nullable: true })
  tenure: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  trainerName: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'tinyint', default: 1 })
  isActive: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CASH: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  UPI: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CARD: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cheque: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  IMPS: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  NEFT: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  RTGS: string;
}
