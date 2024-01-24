import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { DiskService } from 'src/utils/disk.service';
import { CreateNoteDto } from './dto/create.dto';
import { User } from 'src/users/entities/user.entity';
import { WebsitesService } from 'src/websites/websites.service';
import { CommentsService } from 'src/comments/comments.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly repository: Repository<Note>,
    private readonly storage: DiskService,
    private readonly websiteService: WebsitesService,
    private readonly commentService: CommentsService,
  ) {}

  public async create(
    user: User,
    body: CreateNoteDto,
    file: Express.Multer.File,
  ) {
    const screenshot = await this.storage.uploadFile(file);

    const website = await this.websiteService.findOrCreate(body.url);

    return this.repository.save({
      url: body.url,
      note: body.note,
      meta: body.meta,
      screenshot,
      user,
      website,
    });
  }

  public async getById(id: string) {
    const model = await this.repository
      .createQueryBuilder('notes')
      .leftJoinAndSelect('notes.user', 'user')
      .loadRelationCountAndMap('notes.comments', 'notes.comments')
      .where('notes.id = :id', { id })
      .getOne();

    model.screenshot = this.storage.getFileUrl(model.screenshot);
    return model;
  }
}
