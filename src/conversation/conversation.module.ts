import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { Conversation } from './entities/conversation.entity';
import { MarkupService } from '../markup/markup.service';
import { Markup } from '../markup/entities/markup.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Markup])],
  controllers: [ConversationController],
  providers: [ConversationService, MarkupService],
})
export class ConversationModule {}
