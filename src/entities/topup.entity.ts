import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('topup')
export class Topup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: true, collation: 'latin1_swedish_ci' })
    name: string | null;

    @Column({ type: 'tinyint', width: 4, nullable: true, default: 1 })
    isActive: number | null;
}
