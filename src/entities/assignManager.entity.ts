import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('assign_manager')
export class AssignManager {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  staff: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  manager: string | null;

  @Column({ type: 'tinyint', width: 4, default: 1 })
  isActive: number;
}
