import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Website } from 'src/websites/entities/website.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ type: 'text' })
  note: string;

  @Column({ type: 'text' })
  screenshot: string;

  @Column({ type: 'int', default: 0 })
  status: number;

  @Column({ type: 'jsonb' })
  meta: object;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;

  @ManyToOne(() => Website)
  website: Website;

  @OneToMany(() => Comment, (comment) => comment.note)
  comments: Comment[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
