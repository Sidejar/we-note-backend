import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { Thread } from './entities/thread.entity';
import { MarkupService } from '../markup/markup.service';
import { Conversation } from '../conversation/entities/conversation.entity';
import { Markup } from '../markup/entities/markup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Thread, Conversation, Markup])],
  controllers: [ThreadsController],
  providers: [ThreadsService, MarkupService],
})
export class ThreadsModule {}
