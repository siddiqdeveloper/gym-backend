import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('staffPerformance')
export class StaffPerformance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, default: '0', collation: 'latin1_swedish_ci' })
  date: string;

  @Column({ type: 'varchar', length: 50, default: '0', collation: 'latin1_swedish_ci' })
  staff_name: string;

  @Column({ type: 'varchar', length: 50, default: '0', collation: 'latin1_swedish_ci' })
  rating: string;
}
