import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Conversation } from '../../conversation/entities/conversation.entity';
@Entity()
export class Markup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Conversation, (conversation) => conversation.markup)
  conversations: Conversation[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
