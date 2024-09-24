import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;  // Auto-incrementing ID

  @Column({ length: 30, nullable: true })
  userName: string;  // Username, up to 30 characters

  @Column({ length: 50, nullable: true })
  email: string;  // Email, up to 50 characters

  @Column({ length: 200, nullable: true })
  password: string;  // Hashed password

  @Column({ length: 200, nullable: true })
  confirmPassword: string;  // Confirm password field

  @Column({ length: 4, nullable: true })
  otp: string;  // One-time password (OTP), 4 characters

  @Column({ length: 200, nullable: true })
  rememberToken: string;  // "Remember me" token

  @Column({ type: 'datetime', nullable: true })
  createdAt: Date;  // Creation timestamp

  @Column({ type: 'datetime', nullable: true })
  updatedAt: Date;  // Last update timestamp

  @Column({ length: 15, nullable: true })
  phone: string;  // Phone number, max 15 characters

  @Column({ type: 'tinyint', width: 3, unsigned: true, nullable: true })
  telegram: number;  // Telegram integration flag (0 or 1)

  @Column({ length: 10, nullable: true })
  privilege: string;  // User privilege level, max 10 characters

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'deleted'],
    default: 'active',
  })
  status: 'active' | 'inactive' | 'deleted';  // User status with 3 options

  @Column({ type: 'datetime', nullable: true })
  lastLogin: Date;  // Last login timestamp

  @Column({ length: 20, nullable: true })
  telegramRequest: string;  // Telegram request identifier

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;  // Date of birth

  @Column({ length: 50, nullable: true })
  gender: string;  // Gender, max length 50

  @Column({ type: 'text', nullable: true })
  address: string;  // Address field

  @Column({ length: 255, nullable: true })
  position: string;  // Position or job title

  @Column({ type: 'date', nullable: true })
  dateOfJoining: Date;  // Date the user joined

  @Column({ length: 100, nullable: true })
  workHours: string;  // Work hours specification

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salary: number;  // Salary in decimal format

  @Column({ length: 50, nullable: true })
  workStatus: string;  // Work status (e.g., full-time, part-time)

  @Column({ type: 'text', nullable: true })
  certifications: string;  // Certifications as text field

  @Column({ type: 'text', nullable: true })
  specializations: string;  // Specializations as text field

  @Column({ length: 100, nullable: true })
  experienceLevel: string;  // Experience level

  @Column({ length: 100, nullable: true })
  emergencyContactName: string;  // Emergency contact name

  @Column({ length: 100, nullable: true })
  relationship: string;  // Relationship to emergency contact

  @Column({ length: 50, nullable: true })
  emergencyPhoneNumber: string;  // Emergency contact phone number

  @Column({ type: 'blob', nullable: true })
  staffPhoto: Buffer;  // Staff photo stored as a BLOB

  @Column({ type: 'text', nullable: true })
  additionalNotes: string;  // Additional notes
}
