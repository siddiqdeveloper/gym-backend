import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('followupReason')
export class FollowupReason {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  reasonName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  type: string;


  @Column({ type: 'varchar', length: 50, nullable: true })
  process: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  

  @Column({ type: 'tinyint', default: 1 })
  isActive: number;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date | null;
}
