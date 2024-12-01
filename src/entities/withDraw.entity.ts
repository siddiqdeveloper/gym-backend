import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('withdraw')
export class Withdraw {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, default: '0', collation: 'latin1_swedish_ci' })
    name: string;

    @Column({ type: 'tinyint', width: 4, default: 1 })
    isActive: number;
}
