import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Markup } from '../../markup/entities/markup.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  googleId: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Markup, (markup) => markup.user)
  markups: Markup[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
