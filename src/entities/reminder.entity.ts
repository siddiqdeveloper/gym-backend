import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('reminder')
export class Reminder {
  @PrimaryGeneratedColumn()
  id: number;  // Auto-incrementing ID

  

  @Column({ type: 'varchar', length: 100 })
  slno: string;


  @Column({ type: 'varchar', length: 100 })
  reminderPoints: string;


  @Column({ type: 'varchar', length: 100 })
  time: string;


  @Column({ type: 'varchar', length: 100 })
  personInCharge: string;

  @Column({ type: 'varchar', length: 100 })
  reminderResult: string;
 
 

  
}
