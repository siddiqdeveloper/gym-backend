import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('salary')
export class Salary {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    empId: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    designation: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    department: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    bankName: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    bankAccountNo: string;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    grossSalary: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    basicSalary: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    hra: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    conveyance: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    medicalAllowance: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    otherAllowances: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    epf: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    insurance: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    professionalTax: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    loanRecovery: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    incentiveSalary: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    totalSalary: number;

    @Column({ type: 'date', nullable: true })
    salaryDate: string;
    @Column({ type: 'tinyint', width: 4, default: 1 })
    isActive: number;
}
