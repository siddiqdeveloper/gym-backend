import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    memberId: number;

    @Column({ type: 'enum', enum: ['NEW', 'RENEWAL', 'REFUND', 'PT', ''] })
    memberPaymentFor: string;

    @Column({ type: 'date', nullable: true })
    expiryDate: Date;

    @Column({ type: 'int', nullable: true })
    balanceDays: number;
    


    @Column({ type: 'int', nullable: true })
    interestedIn: number;

    @Column({ type: 'date', nullable: true })
    feePaymentDate: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    packageName: string;

    @Column({ type: 'date', nullable: true })
    endDate: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    packageAmount: number;

    @Column({ type: 'enum', enum: ['CASH', 'UPI', 'CARD+CASH', 'CASH+UPI', 'CARD+UPI', 'Cheque', 'Bank', 'Others'] })
    modeOfPayment: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    CASH: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    CARD: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    UPI: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    Bank: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    Cheque: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    paidAmount: any;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    registration_fees: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    discountAmount: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    pendingAmount: number;

    @Column({ type: 'date', nullable: true })
    pendingAmountDate: Date;

    @Column({ type: 'date', nullable: true })
    joiningDate: Date;

    
    @Column({ type: 'tinyint', nullable: true })
    gst_applicable: boolean;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    gst_percentage: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    totalAmount: any;

    @Column({ type: 'varchar', length: 255, nullable: true })
    trainerName: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    referedbymember: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    referedBy: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    collectedBy: string;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    enterTrainerPercentage: number;

    @Column({ type: 'int', nullable: true })
    packageDuration: number;

    @Column({ type: 'int', nullable: true })
    totalMonth: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    eachMonthAmount: number;

    @Column({ type: 'date', nullable: true })
    ptendDate: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    officeTotalAmount: number;

    @Column({ type: 'date', nullable: true })
    endDateIncentive: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'tinyint', default: 1 })
    isActive: boolean;
}
