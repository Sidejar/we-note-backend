import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MarkupModule } from './markup/markup.module';
import { ConversationModule } from './conversation/conversation.module';
import { ThreadsModule } from './threads/threads.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Markup } from './markup/entities/markup.entity';
import { Conversation } from './conversation/entities/conversation.entity';
import { Thread } from './threads/entities/thread.entity';
@Module({
  imports: [
    // ConfigurationModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User, Markup, Conversation, Thread],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    AuthModule,
    MarkupModule,
    ConversationModule,
    ThreadsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
