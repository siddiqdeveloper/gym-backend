import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('blockMembers')
export class BlockMembers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    block_id: number;

    @Column({type:'varchar',length:30,default:null})
    type: number;


    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
