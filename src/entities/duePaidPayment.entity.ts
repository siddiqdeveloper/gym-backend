import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('due_paid_payment')
export class DuePaidPayment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    memberId: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    paymentId: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    memberPaymentFor: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    modeOfPayment: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    feePaymentDate: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    pendingAmount: string;
}
