@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, member => member.attendance)
  memberId: Member;

  @Column({ type: 'date' })
  date: string = new Date().toISOString().split('T')[0]; // Default to today's date

  @Column('time')
  checkIn: string;

  @Column('time')
  checkOut: string;

  @Column()
  branch: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column({ default: false })
  pending: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 }) 
  pendingAmount: number;
}
