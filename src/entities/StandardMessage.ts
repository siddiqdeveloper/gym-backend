// src/messages/entities/standard-message.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('standard_messages')
export class StandardMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column({ unique: true })
  key: string;

  @Column('text')
  content: string;


}
