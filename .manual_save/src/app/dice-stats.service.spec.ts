import { TestBed } from '@angular/core/testing';

import { DiceStatsService } from './dice-stats.service';

describe('DiceStatsService', () => {
  let service: DiceStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiceStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
