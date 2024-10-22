import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('electricityConsumption')
export class ElectricityConsumption {
  @PrimaryGeneratedColumn()
  id: number;  // Auto-incrementing ID

  

  @Column({ type: 'date', nullable: true })
  startDate: Date;  

  @Column({ type: 'varchar', length: 100 })
  startMeterReading: string;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'varchar', length: 100 })
  endMeterReading: string;


  @Column({ type: 'varchar', length: 100 })
  userName: string;


  @Column({ type: 'varchar', length: 100 })
  branchName: string;
 

  
}
