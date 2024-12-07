import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('bulkUploadMeta')
export class BulkUploadMeta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    master_id: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    file_name: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    file_size: string | null;
}
