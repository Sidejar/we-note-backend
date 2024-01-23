import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from './entities/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'src/utils/utils.module';
import { WebsitesModule } from 'src/websites/websites.module';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), UtilsModule, WebsitesModule],
  providers: [NotesController, NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
