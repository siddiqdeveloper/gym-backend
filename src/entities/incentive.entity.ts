import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('incentive')
export class Incentive {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', default: 0 })
    paymentId: number;

    @Column({ type: 'varchar', length: 50, default: '0' })
    enterTrainerPercentage: string;

    @Column({ type: 'varchar', length: 50, default: '0' })
    totalMonth: string;

    @Column({ type: 'varchar', length: 50, default: '0' })
    eachMonthAmount: string;

    @Column({ type: 'varchar', length: 50, default: '0' })
    officeTotalAmount: string;

    @Column({ type: 'varchar', length: 50, default: '0' })
    endDate: string;

    @Column({ type: 'enum', enum: ['pending', 'completed'], default: 'pending' })
    status: 'pending' | 'completed';
}
