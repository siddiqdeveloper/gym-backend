import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('servicelog')
export class ServiceLog {
  @PrimaryGeneratedColumn()
  id: number;  // Auto-incrementing ID

  @Column({ type: 'varchar', length: 100 })
  serviceNo: string;

  @Column({ type: 'varchar', length: 100 })
  serviceName: string;

  @Column({ type: 'date', nullable: true })
  datePosted: Date;  

  @Column({ type: 'varchar', length: 100 })
  personInCharge: string;


  @Column({ type: 'date', nullable: true })
  estimatedDate: string;


  @Column({ type: 'varchar', length: 100 })
  contactPerson: string;

  @Column({ type: 'varchar', length: 100 })
  contactNo: string;


  @Column({ type: 'date', nullable: true })
  actualRepairedOn: string;

  @Column({ type: 'varchar', length: 100 })
  followUpResult: string;


 

  
}
