import { Test, TestingModule } from '@nestjs/testing';
import { TecnoparqueController } from './tecnoparque.controller';

describe('TecnoparqueController', () => {
  let controller: TecnoparqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TecnoparqueController],
    }).compile();

    controller = module.get<TecnoparqueController>(TecnoparqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
