import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('staffPerformanceMeta')
export class StaffPerformanceMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true, collation: 'latin1_swedish_ci' })
  staffPerformanceId: string;


  @Column({ type: 'varchar', length: 50, nullable: true, collation: 'latin1_swedish_ci' })
  criterion: string;

  @Column({ type: 'varchar', length: 50, nullable: true, collation: 'latin1_swedish_ci' })
  stars: string;
}
