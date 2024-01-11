import { Injectable } from '@nestjs/common';
import { CreateMarkupDto } from './dto/create-markup.dto';
import { UpdateMarkupDto } from './dto/update-markup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Markup } from './entities/markup.entity';

@Injectable()
export class MarkupService {
  constructor(
    @InjectRepository(Markup)
    private readonly markupRepository: Repository<Markup>,
  ) {}

  async create(uid: number, createMarkupDto: CreateMarkupDto) {
    const markup = await this.markupRepository.create({
      ...createMarkupDto,
      user: { id: uid },
    });

    return this.markupRepository.save(markup);
  }

  async findMarkupsByUserId(uid: number): Promise<Markup[]> {
    const markups = await this.markupRepository.find({
      where: { user: { id: uid } },
    });

    return markups;
  }

  async getConversationCount(markupId: number): Promise<number> {
    const markup = await this.markupRepository
      .createQueryBuilder('markup')
      .leftJoinAndSelect('markup.conversations', 'conversations')
      .where('markup.id = :id', { id: markupId })
      .getOne();

    if (markup && markup.conversations) {
      return markup.conversations.length;
    }
    return 0;
  }

  findOne(id: number) {
    return this.markupRepository.findOne({ where: { id } });
  }

  update(id: number, updateMarkupDto: UpdateMarkupDto) {
    return `This action updates a #${id} markup`;
  }

  async remove(id: number) {
    const res = await this.markupRepository.delete(id);
    return res;
  }
}
