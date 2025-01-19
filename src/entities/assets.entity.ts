import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('asset')
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  assetId: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  assetName: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  assetType: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  owner: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  purchaseDate: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  currentStatus: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  maintenanceSchedule: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  branch: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  invoiceDocument: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  warrantyCertificate: string | null;
  @Column({ type: 'tinyint', width: 4, default: 1 })
  isActive: number;
}
