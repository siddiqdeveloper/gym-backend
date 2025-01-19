import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('paymentType')
export class PaymentType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    name: string | null;


    @Column({ type: 'tinyint', width: 4, default: 1 })
    isActive: number;
}
