import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('staffAttendance')
export class StaffAttendance {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: 'varchar', length: 255, collation: 'latin1_swedish_ci', nullable: false })
  staff_id: string;

  @Column({ type: 'date', default: () => "'2024-01-01'", nullable: false })
  date: string;

  @Column({ type: 'time', nullable: false })
  checkIn: string;

  @Column({ type: 'time', nullable: false })
  checkOut: string;

 
}