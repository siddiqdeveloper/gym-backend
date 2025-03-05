import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn } from 'typeorm';

@Entity('followupInActive') // Replace with your actual table name
export class FollowupInActive {
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


  @Column({ type: 'varchar',length:50, nullable: true,})
  charge: string | null;


  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type:'tinyint', default: 1 })
  isActive: number;
}
