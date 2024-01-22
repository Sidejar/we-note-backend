import { Module } from '@nestjs/common';
import { WebsitesService } from './websites.service';
import { WebsitesController } from './websites.controller';

@Module({
  providers: [WebsitesController, WebsitesService],
  exports: [WebsitesController],
})
export class WebsitesModule {}
