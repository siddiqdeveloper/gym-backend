import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn } from 'typeorm';

@Entity('inactiveAssignment') // Replace with your actual table name
export class InactiveAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  member_id: number;

  @Column({ type: 'date', nullable: true })
  assignDate: Date | null;

  

  @Column({ type: 'varchar', length: 50})
  member_code: string;

  @Column()
  staff_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
