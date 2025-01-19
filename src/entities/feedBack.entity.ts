import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('feedBack')
export class FeedBack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  customerName: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  stars: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  feedbackNotes: string | null;

  @Column({ type: 'tinyint', width: 4, default: 1 })
  isActive: number;
}
