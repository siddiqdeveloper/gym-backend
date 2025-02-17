import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('email_template')
export class EmailTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  templateName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  process: string;

  @Column({ type: 'text', nullable: true })
  emailContent: string;

  // New column to indicate if the Email Template is active or not
  @Column({ type: 'tinyint', default: 1 })
  isActive: number;

 

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
