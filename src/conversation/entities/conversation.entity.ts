import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Markup } from '../../markup/entities/markup.entity';
import { Thread } from '../../threads/entities/thread.entity';
@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  title: string;

  @Column()
  status: string;

  @Column()
  xCord: string;

  @Column()
  yCord: string;

  @ManyToOne(() => Markup, (markup) => markup.conversations)
  markup: Markup;

  @OneToMany(() => Thread, (thread) => thread.conversation)
  threads: Thread[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
