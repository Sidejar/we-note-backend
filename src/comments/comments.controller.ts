import { Controller } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('websites')
export class CommentsController {
  constructor(private readonly service: CommentsService) {}
}
