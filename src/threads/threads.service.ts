import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { Thread } from './entities/thread.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private readonly threadRepository: Repository<Thread>,

  ) { }
  create(cid: number, createThreadDto: CreateThreadDto) {
    const markup = this.threadRepository.create({
      ...createThreadDto,
      conversation: { id: cid },
    });

    return this.threadRepository.save(markup);
  }

  findAll() {
    return `This action returns all threads`;
  }

  async findOne(id: number) {
    const thread = await this.threadRepository.findOne({ where: { id } });

    if (!thread) {
      throw new NotFoundException('Thread not found');
    }

    return thread;
  }

  async update(id: number, updateThreadDto: UpdateThreadDto): Promise<Thread> {
    await this.threadRepository.update(id, updateThreadDto);
    return this.threadRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const res = await this.threadRepository.delete(id);
    return res
  }
}
