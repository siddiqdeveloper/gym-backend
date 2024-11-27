import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';
  
  @Entity('branchDetails')
  export class BranchDetails {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 50, nullable: true, collation: 'latin1_swedish_ci' })
    branchName: string | null;
  
    @Column({ type: 'varchar', length: 50, nullable: true, collation: 'latin1_swedish_ci' })
    branchCode: string | null;
  
    @Column({ type: 'varchar', length: 50, nullable: true, collation: 'latin1_swedish_ci' })
    city: string | null;
  
    @Column({ type: 'varchar', length: 50, nullable: true, collation: 'latin1_swedish_ci' })
    state: string | null;
  
    @Column({ type: 'varchar', length: 50, nullable: true, collation: 'latin1_swedish_ci' })
    contactNumber: string | null;
  
    @Column({ type: 'varchar', length: 50, nullable: true, collation: 'latin1_swedish_ci' })
    address: string | null;
  
    @Column({ type: 'tinyint', width: 4, default: 1 })
    isActive: number;
  }
  