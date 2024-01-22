import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';

@Module({
  providers: [CommentsController, CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
