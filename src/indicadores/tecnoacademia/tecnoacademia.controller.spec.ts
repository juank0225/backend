import { Test, TestingModule } from '@nestjs/testing';
import { TecnoacademiaController } from './tecnoacademia.controller';

describe('TecnoacademiaController', () => {
  let controller: TecnoacademiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TecnoacademiaController],
    }).compile();

    controller = module.get<TecnoacademiaController>(TecnoacademiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
