import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('packages')
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  packageName: string;

  @Column()
  packageDuration: string;

  @Column('decimal', { precision: 10, scale: 2 })
  packagePrice: number;

  @Column()
  packageFeatures: string;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  discount: number;

  @Column()
  startDate: string; // or you can use Date type

  @Column()
  endDate: string; // or you can use Date type
}
