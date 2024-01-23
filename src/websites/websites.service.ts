import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import URL from 'url';
import { Website } from './entities/website.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WebsitesService {
  constructor(
    @InjectRepository(Website)
    private readonly repository: Repository<Website>,
  ) {}

  public async findOrCreate(url: string) {
    const result = URL.parse(url);

    const existing = await this.repository.findOneBy({ url: result.hostname });
    if (existing) return existing;

    return this.repository.save({
      name: result.hostname,
      url: result.hostname,
    });
  }
}
