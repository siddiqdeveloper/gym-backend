import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('setting')
export class Setting {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
        collation: 'latin1_swedish_ci',
        default: null,
    })
    key: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
        collation: 'latin1_swedish_ci',
        default: null,
    })
    value: string;
}