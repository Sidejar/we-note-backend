import { Controller } from '@nestjs/common';
import { WebsitesService } from './websites.service';

@Controller('websites')
export class WebsitesController {
    constructor(private readonly service: WebsitesService) {}
}
