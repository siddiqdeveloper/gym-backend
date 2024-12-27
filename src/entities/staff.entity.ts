import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  staffId: string;

  @Column()
  fullName: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  gender: string;

  @Column()
  contactNumber: string;

  @Column()
  emailAddress: string;

  @Column()
  address: string;

  @Column()
  position: string;

  @Column({ type: 'date' })
  dateOfJoining: Date;

  @Column()
  workHours: string;

  @Column('decimal')
  salary: number;

  @Column()
  workStatus: string;

  @Column({ nullable: true })
  certifications: string;

  @Column({ nullable: true })
  specializations: string;

  @Column({ nullable: true })
  experienceLevel: string;

  @Column()
  emergencyContactName: string;

  @Column()
  relationship: string;

  @Column()
  emergencyPhoneNumber: string;

  @Column({ nullable: true })
  additionalNotes: string;

  // File uploads
  @Column({ nullable: true })
  staffPhoto: string;

  @Column({ nullable: true })
  resume: string;

  @Column('simple-array', { nullable: true })
  otherDocuments: string[];


  @Column({ type:'tinyint', default: 1 })
  isActive: number;


  @Column({ type: 'enum', enum: ['manager', 'staff', 'trainer', 'admin', 'accountant'] })
  type: 'manager' | 'staff' | 'trainer' | 'admin' | 'accountant';

}
