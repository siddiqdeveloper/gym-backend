import { Test, TestingModule } from '@nestjs/testing';
import { MiscController } from './misc.controller';

describe('MiscController', () => {
  let controller: MiscController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiscController],
    }).compile();

    controller = module.get<MiscController>(MiscController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
