import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fellowupLead') // Replace with your actual table name
export class FellowLead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column()
  createdAt: Date; // Adjust as necessary based on your schema

  // Add other relevant fields as necessary
}
