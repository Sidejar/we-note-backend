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
import { CommentsService } from 'src/comments/comments.service';
import { CreateCommentDto } from 'src/comments/dto/create.dto';

@Controller('notes')
export class NotesController {
  constructor(
    private readonly service: NotesService,
    private readonly commentService: CommentsService,
  ) {}

  @Get('/summary')
  public async getSummary(@Request() req) {
    return this.service.getSummary(req.user);
  }

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

  @Post('/:id/comments')
  public async postComment(
    @Request() req,
    @Param('id') id: string,
    @Body() body: CreateCommentDto,
  ) {
    const note = await this.getById(id);
    return this.commentService.create(req.user, note, body);
  }

  @Get('/:id/comments')
  public async getComments(@Param('id') id: string) {
    const note = await this.getById(id);
    return this.commentService.getAllByNote(note);
  }
}
