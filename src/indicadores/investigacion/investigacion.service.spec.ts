import { Test, TestingModule } from '@nestjs/testing';
import { InvestigacionService } from './investigacion.service';

describe('InvestigacionService', () => {
  let service: InvestigacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestigacionService],
    }).compile();

    service = module.get<InvestigacionService>(InvestigacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
