import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn } from 'typeorm';

@Entity('followupContinue') // Replace with your actual table name
export class FollowupContinue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true })
  followup_date: Date | null;

  @Column({ type: 'int', nullable: true })
  member_id: number | null;

  @Column({ type: 'text', nullable: true, collation: 'latin1_swedish_ci' })
  reason: string | null;

  @Column({ type: 'text', nullable: true, collation: 'latin1_swedish_ci' })
  remarks: string | null;


  @Column({ type: 'int', nullable: true,})
  staff_id: string | null;


  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type:'tinyint', default: 1 })
  isActive: number;
}
