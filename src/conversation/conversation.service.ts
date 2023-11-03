import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { Markup } from '../markup/entities/markup.entity';
@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly convoRepository: Repository<Conversation>,
    @InjectRepository(Markup)
    private readonly markupRepository: Repository<Markup>,
  ) { }


  async createConversation(createConversationDto: CreateConversationDto, markupId: number): Promise<Conversation> {
    const conversation = new Conversation();
    conversation.title = createConversationDto.title;
    conversation.status = createConversationDto.status;
    conversation.xCord = createConversationDto.xCord;
    conversation.yCord = createConversationDto.yCord;
    conversation.username = createConversationDto.username;

    // Assuming you have a Markup entity with ID markupId in the database
    const markup = await this.markupRepository.findOne({ where: { id: markupId } });
    if (!markup) {
      // Handle the case where the associated markup is not found
      throw new NotFoundException('Markup not found');
    }

    conversation.markup = markup;

    return await this.convoRepository.save(conversation);
  }


  async getConversationAndThreadsByMarkupId(markupId: number) {
    const markup = await this.markupRepository
      .createQueryBuilder('markup')
      .where('markup.id = :id', { id: markupId })
      .leftJoinAndSelect('markup.conversations', 'conversations')
      .leftJoinAndSelect('conversations.threads', 'threads')
      .getOne();

    if (!markup) {
      throw new NotFoundException('Markup not found');
    }

    return markup;
  }

  async findOneWithThreads(id: number): Promise<Conversation> {
    const conversation = await this.convoRepository
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.threads', 'threads')
      .where('conversation.id = :id', { id })
      .getOne();

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    conversation.threads = conversation.threads || [];
    return conversation;
  }

  findOne(id: number) {
    return this.convoRepository.findOne({ where: { id } });
  }

  async update(id: number, updateConversationDto: UpdateConversationDto): Promise<Conversation> {
    await this.convoRepository.update(id, updateConversationDto);
    return this.convoRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const res = await this.convoRepository.delete(id);
    return res
  }
}
