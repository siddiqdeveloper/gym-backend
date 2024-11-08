import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('workOutType')
export class WorkOutType {
  @PrimaryGeneratedColumn()
  id: number;  // Auto-incrementing ID

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type:'tinyint', default: 1 })
  isActive: number;


 

  
}