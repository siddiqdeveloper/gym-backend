import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pettyCash')
export class PettyCash {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  expType: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  purpose: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  modeOfPay: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  paidAmt: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  paidBy: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  remarks: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  attachBills: string;
  @Column({ type: 'varchar', length: 50, nullable: true })
  bankName: string;

  @Column({ type:'tinyint', default: 1 })
  isActive: number;
}


