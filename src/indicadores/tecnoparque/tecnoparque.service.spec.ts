import { Test, TestingModule } from '@nestjs/testing';
import { TecnoparqueService } from './tecnoparque.service';

describe('TecnoparqueService', () => {
  let service: TecnoparqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TecnoparqueService],
    }).compile();

    service = module.get<TecnoparqueService>(TecnoparqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
