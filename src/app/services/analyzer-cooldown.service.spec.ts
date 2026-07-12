import { TestBed } from '@angular/core/testing';

import { AnalyzerCooldownService } from './analyzer-cooldown.service';

describe('AnalyzerCooldownService', () => {
  let service: AnalyzerCooldownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyzerCooldownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
