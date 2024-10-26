import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('checkList')
export class CheckList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true })
  date: string;

  @Column({ type: 'varchar', length: 100, nullable: true, collation: 'latin1_swedish_ci' })
  days: string;

  @Column({ type: 'varchar', length: 100, nullable: true, collation: 'latin1_swedish_ci' })
  ebReading: string;

  @Column({ type: 'varchar', length: 100, nullable: true, collation: 'latin1_swedish_ci' })
  leads: string;

  @Column({ type: 'enum', enum: ['true', 'false'], nullable: true, collation: 'latin1_swedish_ci' })
  cardioClean: string;

  @Column({ type: 'enum', enum: ['true', 'false'], nullable: true, collation: 'latin1_swedish_ci' })
  tmBeltClean: string;

  @Column({ type: 'enum', enum: ['true', 'false'], nullable: true, collation: 'latin1_swedish_ci' })
  computerClean: string;

  @Column({ type: 'enum', enum: ['true', 'false'], nullable: true, collation: 'latin1_swedish_ci' })
  oilForTreadmill: string;

  @Column({ type: 'enum', enum: ['true', 'false'], nullable: true, collation: 'latin1_swedish_ci' })
  machineClean: string;

  @Column({ type: 'enum', enum: ['true', 'false'], nullable: true, collation: 'latin1_swedish_ci' })
  dumbbellClean: string;

  @Column({ type: 'enum', enum: ['true', 'false'], nullable: true, collation: 'latin1_swedish_ci' })
  platesClean: string;

  @Column({ type: 'enum', enum: ['true', 'false'], nullable: true, collation: 'latin1_swedish_ci' })
  mirrorClean: string;

  @Column({ type: 'enum', enum: ['true', 'false'], nullable: true, collation: 'latin1_swedish_ci' })
  lockersCheck: string;

  @Column({ type: 'enum', enum: ['true', 'false'], nullable: true, collation: 'latin1_swedish_ci' })
  fanService: string;

  @Column({ type: 'enum', enum: ['true', 'false'], nullable: true, collation: 'latin1_swedish_ci' })
  acFilterClean: string;

  @Column({ type: 'enum', enum: ['true', 'false'], nullable: true, collation: 'latin1_swedish_ci' })
  waterDispenserClean: string;

  @Column({ type: 'enum', enum: ['true', 'false'], nullable: true, collation: 'latin1_swedish_ci' })
  birthdayCalls: string;

  @Column({ type: 'enum', enum: ['true', 'false'], nullable: true, collation: 'latin1_swedish_ci' })
  membershipExpiryCalls: string;

  @Column({ type: 'enum', enum: ['true', 'false'], nullable: true, collation: 'latin1_swedish_ci' })
  continuousAbsenteesCalls: string;
}
