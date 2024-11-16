import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('freeze')
export class Freeze {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Count: string;
  
  @Column({ type: 'varchar', length: 255, nullable: true })
  Member: string;


  @Column({ type: 'date', nullable: true })
  endDate: Date;

 
@Column({ type:'tinyint', default: 1 })
  isActive: number;
}
