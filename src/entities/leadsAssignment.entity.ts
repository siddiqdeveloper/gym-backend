import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('leadsAssignment')
export class leadsAssignment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lead_id: number;


    @Column()
    staff_id: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
