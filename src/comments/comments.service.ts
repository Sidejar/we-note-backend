import { Injectable } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateCommentDto } from './dto/create.dto';
import { Note } from 'src/notes/entities/note.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>,
  ) {}

  public async create(user: User, note: Note, body: CreateCommentDto) {
    return this.repository.save({
      comment: body.comment,
      user,
      note,
    });
  }

  public getAllByNote(note: Note) {
    return this.repository.find({
      where: { note: { id: note.id } },
      relations: { user: true },
      order: { createdAt: 'asc' },
    });
  }
}
