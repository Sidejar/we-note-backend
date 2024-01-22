import { Body, Controller } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly service: NotesService) {}

  public async create(@Body() body: CreateNoteDto) {
    
  }
}
