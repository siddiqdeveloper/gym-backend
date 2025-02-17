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

  @Column({ 
    type: 'enum', 
    enum: ['active', 'inactive', 'void'], 
    default: 'active' 
  })
  status: 'active' | 'inactive' | 'void';

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
