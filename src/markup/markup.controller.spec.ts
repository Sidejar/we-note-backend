import { Test, TestingModule } from '@nestjs/testing';
import { MarkupController } from './markup.controller';
import { MarkupService } from './markup.service';

describe('MarkupController', () => {
  let controller: MarkupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarkupController],
      providers: [MarkupService],
    }).compile();

    controller = module.get<MarkupController>(MarkupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
