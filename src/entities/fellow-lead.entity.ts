import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn } from 'typeorm';

@Entity('fellowupLead') // Replace with your actual table name
export class FellowLead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true })
  fellowup_date: Date | null;

  @Column({ type: 'int', nullable: true })
  lead_id: number | null;

  @Column({ type: 'text', nullable: true, collation: 'latin1_swedish_ci' })
  reason: string | null;

  @Column({ type: 'text', nullable: true, collation: 'latin1_swedish_ci' })
  remarks: string | null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
