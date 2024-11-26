import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('bankDetails')
export class BankDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  accName: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  bankName: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  typeOfAcc: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  branchName: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  ifscCode: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string | null;

  
  @Column({ type:'tinyint', default: 1 })
  isActive: number;
}
