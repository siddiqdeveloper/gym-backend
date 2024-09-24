import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('packages')
export class Package {
  @PrimaryGeneratedColumn()
  id: number;  // Auto-incrementing ID

  @Column({ length: 100, nullable: true })
  packageName: string;  // Package name

  @Column({ length: 50, nullable: true })
  packageDuration: string;  // Package duration

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  packagePrice: number;  // Package price

  @Column({ type: 'text', nullable: true })
  packageFeatures: string;  // Package features

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  discount: number;  // Discount percentage

  @Column({ type: 'date', nullable: true })
  startDate: Date;  // Start date

  @Column({ type: 'date', nullable: true })
  endDate: Date;  // End date

  @Column({ type: 'int', nullable: true })
  personalTrainingSessions: number;  // Number of personal training sessions

  @Column({ length: 100, nullable: true })
  gymAccess: string;  // Gym access details

  @Column({ type: 'text', nullable: true })
  groupClassesIncluded: string;  // Group classes included

  @Column({ length: 100, nullable: true })
  nutritionConsultation: string;  // Nutrition consultation details

  @Column({ type: 'text', nullable: true })
  additionalPerks: string;  // Additional perks
}
