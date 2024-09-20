import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';


export enum UserType {
  'ADMIN' = 'admin',
  'USER' = 'user',
  'EMPLOYEE' = 'employee',
  'TECHNICIAN' = 'technician',
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 32 })
  name: string;



  @Index({ unique: true })
  @Column({ type: 'varchar', length: 50 })
  email: string;


  @Column({ type: 'tinyint', default: 0 })
  deleted: number;




  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  code: string;


  // @Column({
  //   type: 'varchar',
  //   length: 255,
  //   select: false,
  //   nullable: true,
  //   default: null,
  // })
  // remember_token: string;

  @Column({ type: 'varchar', length: 255 })
  remember_token: string;

  @Column({ type: 'varchar', length: 255 })
  userType: string;

  @Column({ type: 'tinyint', default: 0, nullable: true })
  status: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  
}
