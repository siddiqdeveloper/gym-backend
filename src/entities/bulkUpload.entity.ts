import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bulkUpload')
export class BulkUpload {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: true, collation: 'latin1_swedish_ci' })
    memberId: string | null;

    @Column({ type: 'varchar', length: 50, nullable: true, collation: 'latin1_swedish_ci' })
    name: string | null;

    @Column({ type: 'varchar', length: 50, nullable: true, collation: 'latin1_swedish_ci' })
    mobile: string | null;

    @Column({ type: 'varchar', length: 50, nullable: true, collation: 'latin1_swedish_ci' })
    email: string | null;

    @Column({ type: 'varchar', length: 50, nullable: true, collation: 'latin1_swedish_ci' })
    age: string | null;

    @Column({ type:'tinyint', default: 1 })
    isActive: number;

}
