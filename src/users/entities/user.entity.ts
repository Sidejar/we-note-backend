
import { Entity, PrimaryGeneratedColumn, OneToMany, Column, CreateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Markup } from '../../markup/entities/markup.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string; // Changed to string type

  @Column()
  password: string;

  @OneToMany(() => Markup, markup => markup.user)
  markups: Markup[];


  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}