import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Website } from 'src/websites/entities/website.entity';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ type: 'text' })
  note: string;

  @Column({ type: 'text' })
  screenshot: string;

  @Column({ type: 'int8' })
  status: number;

  @Column({ type: 'jsonb' })
  meta: object;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;

  @ManyToOne(() => Website)
  website: Website;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
