import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('notes')
export class NotesController {
  constructor(private readonly service: NotesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  public create(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateNoteDto,
  ) {
    return this.service.create(req.user, body, file);
  }

  @Get('/:id')
  public async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }
}
