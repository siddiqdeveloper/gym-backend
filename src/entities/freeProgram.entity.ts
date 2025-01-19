import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'freeProgram' })
export class FreeProgram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    default: null,
    collation: 'latin1_swedish_ci',
  })
  reminderName: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    default: null,
    collation: 'latin1_swedish_ci',
  })
  time: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    default: null,
    collation: 'latin1_swedish_ci',
  })
  personInCharge: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    default: null,
    collation: 'latin1_swedish_ci',
  })
  reminderResult: string | null;

  @Column({ type: 'tinyint', default: 1 })
  isActive: number;
}
