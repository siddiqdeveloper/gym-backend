import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('packageExpiryAssignment')
export class PackageExpiryAssignment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    member_id: number;

    @Column({ type: 'varchar', length: 50})
    member_code: string;

    @Column()
    staff_id: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
