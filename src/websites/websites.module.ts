import { Module } from '@nestjs/common';
import { WebsitesService } from './websites.service';
import { WebsitesController } from './websites.controller';
import { Website } from './entities/website.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src/notes/entities/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Website, Note])],
  providers: [WebsitesController, WebsitesService],
  exports: [WebsitesService],
  controllers: [WebsitesController],
})
export class WebsitesModule {}
