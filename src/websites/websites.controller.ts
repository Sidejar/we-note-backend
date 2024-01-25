import { Controller, Get, Param, Request } from '@nestjs/common';
import { WebsitesService } from './websites.service';

@Controller('websites')
export class WebsitesController {
  constructor(private readonly service: WebsitesService) {}

  @Get('/:id/notes')
  public async getNotes(@Request() req, @Param('id') id: number) {
    return this.service.getNotes(req.user, id);
  }
}
