import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('leadsassignment')
export class leadsAssignment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lead_id: number;

    

    @Column({ type: 'date', nullable: true })
    assignDate: Date | null;


    @Column()
    staff_id: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
