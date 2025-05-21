import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('checkList')
export class CheckList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true })
  date: string;


  @Column({ type: 'varchar',length:100, nullable: true })
  title: string;

  @Column({ type: 'tinyint',default:0 })
  checked: number;

}