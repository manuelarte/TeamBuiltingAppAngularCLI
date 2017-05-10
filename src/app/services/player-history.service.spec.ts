import { TestBed, inject } from '@angular/core/testing';

import { PlayerHistoryService } from './player-history.service';

describe('PlayerHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerHistoryService]
    });
  });

  it('should ...', inject([PlayerHistoryService], (service: PlayerHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
