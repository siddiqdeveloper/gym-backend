import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number; // Auto-incrementing ID

  @Column({ length: 50, nullable: true })
  memberId: string; // Member ID

  @Column({ length: 100, nullable: true })
  name: string; // Member's name

  @Column({ length: 15, nullable: true })
  mobile: string; // Mobile number

  @Column({ length: 50, nullable: true })
  email: string; // Email

  @Column({ type: 'int', nullable: true })
  age: number; // Age

  @Column({ type: 'int', nullable: true })
  interestedIn: number; // interestedIn

  @Column({ type: 'int', nullable: true })
  packagePrice: number;

  @Column({ length: 10, nullable: true })
  gender: string; // Gender

  @Column({ length: 10, nullable: true })
  maritalStatus: string; // Marital status

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  shoulders: number; // Shoulders measurement

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  arms: number; // Arms measurement

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  chest: number; // Chest measurement

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  abdomenUpper: number; // Upper abdomen measurement

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  waist: number; // Waist measurement

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  abdomenLower: number; // Lower abdomen measurement

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  glute: number; // Glute measurement

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  thigh: number; // Thigh measurement

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  calf: number; // Calf measurement

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  height: number; // Height

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight: number; // Weight

  @Column({
    type: 'enum',
    enum: ['yes', 'no'],
    nullable: true,
  })
  smoking: 'yes' | 'no'; // Smoking status

  @Column({
    type: 'enum',
    enum: ['yes', 'no'],
    nullable: true,
  })
  alcohol: 'yes' | 'no'; // Alcohol consumption

  @Column({ length: 100, nullable: true })
  foodPreference: string; // Food preference

  @Column({ type: 'text', nullable: true })
  fitnessGoal: string; // Fitness goals (can be stored as a JSON string or comma-separated values)

  @Column({ type: 'text', nullable: true })
  workoutType: string; // Workout types (can be stored as a JSON string or comma-separated values)

  @Column({ type: 'date', nullable: true })
  billDate: Date; // Bill date

  @Column({ type: 'varchar', length: 255, nullable: true })
  endDate: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  trainerName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  staff: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  branch: string;

  @Column({ type: 'date', nullable: true })
  dob: Date; // dob date

  @Column({ type: 'date', nullable: true })
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @Column({ type: 'tinyint', default: 1 })
  isActive: number;

  @Column({ type: 'tinyint', default: 0 })
  freezeStatus: number;
}
