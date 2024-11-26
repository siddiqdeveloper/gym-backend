import {
    Entity,
    PrimaryGeneratedColumn,
    Column
  } from 'typeorm';
  
  @Entity('gst')
  export class Gst {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    gstNumber: string | null;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    businessName: string | null;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    state: string | null;
  
    @Column({ type: 'varchar', length: 50, nullable: true, })
    panNumber: string | null;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    contactName: string | null;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    phoneNumber: string | null;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    email: string | null;

    @Column({ type:'tinyint', default: 1 })
  isActive: number;
  }
  