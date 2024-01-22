import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { DiskService } from 'src/utils/disk.service';
import { CreateNoteDto } from './dto/create.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly repository: Repository<Note>,
    private readonly storage: DiskService,
  ) {}

  public async create(file: Express.Multer.File, body: CreateNoteDto) {
    return this.storage.uploadFile(file);
  }
}
