import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: 'varchar', length: 255, collation: 'latin1_swedish_ci', nullable: false })
  memberId: string;

  @Column({ type: 'date', default: () => "'2024-01-01'", nullable: false })
  date: string;

  @Column({ type: 'time', nullable: false })
  checkIn: string;

  @Column({ type: 'time', nullable: false })
  checkOut: string;

  @Column({ type: 'varchar', length: 255, collation: 'latin1_swedish_ci', nullable: false })
  branch: string;

  @Column({ type: 'date', default: () => "'2024-01-01'", nullable: false })
  endDate: string;

  @Column({ type: 'tinyint', default: 0, nullable: false })
  pending: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00, nullable: false })
  pendingAmount: number;
}
