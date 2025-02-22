import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('due_paid_payment')
export class DuePaidPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  memberId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  paymentId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  memberPaymentFor: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  modeOfPayment: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  feePaymentDate: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  pendingAmount: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  totalAmount: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  paidAmount: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  CASH: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  GPAY: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  CARD: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  Cheque: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    IMPS: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    NEFT: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    RTGS: string;
}
