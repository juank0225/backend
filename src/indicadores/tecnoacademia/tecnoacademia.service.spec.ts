import { Test, TestingModule } from '@nestjs/testing';
import { TecnoacademiaService } from './tecnoacademia.service';

describe('TecnoacademiaService', () => {
  let service: TecnoacademiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TecnoacademiaService],
    }).compile();

    service = module.get<TecnoacademiaService>(TecnoacademiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
