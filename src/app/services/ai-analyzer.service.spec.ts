import { TestBed } from '@angular/core/testing';

import { AiAnalyzerService } from './ai-analyzer.service';

describe('AiAnalyzerService', () => {
  let service: AiAnalyzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiAnalyzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
