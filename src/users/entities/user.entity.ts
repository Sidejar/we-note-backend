import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Note } from 'src/notes/entities/note.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  googleId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
