import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('waterConsumption')
export class WaterConsumption {
  @PrimaryGeneratedColumn()
  id: number;  // Auto-incrementing ID

  

  @Column({ type: 'date', nullable: true })
  date: Date;  

  @Column({ type: 'varchar', length: 100 })
  description: string;

  
  @Column({ type: 'int', default:null })
  personInCharge: number;


  @Column({ type: 'varchar', length: 100 })
  numberOfCans: string;

  @Column({ type: 'varchar', length: 100 })
  ratepercan: string;


  @Column({ type: 'varchar', length: 100 })
  amount: string;


  
  @Column({ type:'tinyint', default: 1 })
  isActive: number;


 

  
}
