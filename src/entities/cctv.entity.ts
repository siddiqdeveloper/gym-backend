import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('watchCCTV')
export class Cctv {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  CCTV: string | null;
}
