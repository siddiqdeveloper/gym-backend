import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('receive_payment')
export class ReceivePayment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    name: string | null;

    @Column({ type:'tinyint', default: 1 })
    isActive: number;
}
