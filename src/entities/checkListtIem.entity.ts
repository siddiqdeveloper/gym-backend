import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('checkListItem')
export class CheckListItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: true, collation: 'latin1_swedish_ci' })
  checkListName: string;

  @Column({ type:'tinyint', default: 1 })
  isActive: number;
}
