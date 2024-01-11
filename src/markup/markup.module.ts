import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarkupService } from './markup.service';
import { MarkupController } from './markup.controller';
import { Markup } from './entities/markup.entity';
import { User } from '../users/entities/user.entity';
import { Conversation } from '../conversation/entities/conversation.entity';
import { ConversationService } from '../conversation/conversation.service';
import { Thread } from '../threads/entities/thread.entity';
import { ThreadsService } from '../threads/threads.service';
@Module({
  imports: [TypeOrmModule.forFeature([Markup, User, Conversation, Thread])],
  controllers: [MarkupController],
  providers: [MarkupService, ConversationService, ThreadsService],
})
export class MarkupModule {}
