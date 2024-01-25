import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import URL from 'url';
import { Website } from './entities/website.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Note } from 'src/notes/entities/note.entity';

@Injectable()
export class WebsitesService {
  constructor(
    @InjectRepository(Website)
    private readonly repository: Repository<Website>,
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) {}

  public async findOrCreate(url: string) {
    const result = URL.parse(url);

    const existing = await this.repository.findOneBy({ url: result.hostname });
    if (existing) return existing;

    return this.repository.save({
      name: result.hostname,
      url: result.hostname,
    });
  }

  public async getNotes(user: User, id: number) {
    return this.notesRepository
      .createQueryBuilder('notes')
      .select([
        'notes.id as id',
        'count(comments.id) AS replies',
        'MAX(notes.note) as note',
        'MAX(notes.url) as url',
        'MAX(notes.createdAt) as "createdAt"',
      ])
      .leftJoin('notes.comments', 'comments')
      .groupBy('notes.id')
      .orderBy('"createdAt"', 'DESC')
      .where('notes.userId = :userId AND notes.websiteId = :websiteId', {
        userId: user.id,
        websiteId: id,
      })
      .getRawMany();
  }
}
