import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('withDrawal')
export class Withdrawal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    amount: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    bank: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    transactionDate: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    remarks: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    cashTopUpName: string;
}
