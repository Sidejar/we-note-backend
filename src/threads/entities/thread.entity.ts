

import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, IsNull } from 'typeorm';
import { Conversation } from '../../conversation/entities/conversation.entity';
@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  seriesNo: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  xCord: string;

  @Column({ nullable: true })
  yCord: string;

  @Column()
  status: string;

  @ManyToOne(() => Conversation, conversation => conversation.threads)
  conversation: Conversation;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}

