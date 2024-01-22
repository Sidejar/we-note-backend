import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
  Get,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('notes')
export class NotesController {
  constructor(private readonly service: NotesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  public async create(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateNoteDto,
  ) {
    return this.service.create(req.user, body, file);
  }

}
