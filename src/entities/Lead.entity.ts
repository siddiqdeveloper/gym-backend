import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;  // Auto-incrementing ID

  @Column({ length: 100, nullable: true })
  name: string;  // Lead's name

  @Column({ type: 'text', nullable: true })
  address: string;  // Lead's address

  @Column({ length: 15, nullable: true })
  mobile: string;  // Lead's mobile number

  @Column({ length: 50, nullable: true })
  email: string;  // Lead's email

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;  // Lead's date of birth

  @Column({ length: 50, nullable: true })
  occupation: string;  // Lead's occupation

  @Column({ length: 100, nullable: true })
  interestedIn: string;  // What the lead is interested in

  @Column({ type: 'date', nullable: true })
  expectedJoinDate: Date;  // Expected date of joining

  @Column({
    type: 'enum',
    enum: ['yes', 'no'],
    nullable: true,
  })
  personalTraining: 'yes' | 'no';  // Personal training requirement

  @Column({ type: 'simple-json', nullable: true })
  fitnessGoal: string[];  // Lead's fitness goals as an array

  @Column({ type: 'date', nullable: true })
  callbackDate: Date;  // Callback 
  
  @Column({ type: 'date', nullable: true })
  walkinDate: Date;  // Callback date

  @Column({ type: 'time', nullable: true })
  callbackTime: string;  // Callback time

  @Column({ length: 100, nullable: true })
  howDidYouHear: string;  // Source of information

  @Column({
    type: 'enum',
    enum: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
    nullable: true,
  })
  satisfaction: 'Very Dissatisfied' | 'Dissatisfied' | 'Neutral' | 'Satisfied' | 'Very Satisfied';  // Customer service satisfaction rating

  @Column({ length: 100, nullable: true })
  staffName: string;  // Staff member's name


  @Column({ type:'tinyint', default: 1 })
  isActive: number;
}

