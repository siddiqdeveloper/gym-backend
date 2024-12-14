import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('bmi')
export class Bmi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  member_id: string | null;

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
  weight: number;

  @Column({ type: 'date', nullable: true })
  date: Date;

}
