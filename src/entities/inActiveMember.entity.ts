import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('inActiveMember')
export class InActiveMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    default: '0',
    collation: 'latin1_swedish_ci',
  })
  member_id: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: '0',
    collation: 'latin1_swedish_ci',
  })
  reason: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: '0',
    collation: 'latin1_swedish_ci',
  })
  remark: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: '0',
    collation: 'latin1_swedish_ci',
  })
  callBackDate: string;
}
