import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { ValidationPipe } from '@nestjs/common';
import { UsersController } from './users.controller';
import { Markup } from '../markup/entities/markup.entity';
import { User } from './entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, ValidationPipe]
})
export class UsersModule { }
