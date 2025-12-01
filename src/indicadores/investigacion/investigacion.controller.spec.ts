import { Test, TestingModule } from '@nestjs/testing';
import { InvestigacionController } from './investigacion.controller';

describe('InvestigacionController', () => {
  let controller: InvestigacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestigacionController],
    }).compile();

    controller = module.get<InvestigacionController>(InvestigacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
