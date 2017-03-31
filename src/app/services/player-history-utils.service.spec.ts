import { TestBed, inject } from '@angular/core/testing';

import { PlayerHistoryUtilsService } from './player-history-utils.service';

describe('PlayerHistoryUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerHistoryUtilsService]
    });
  });

  it('should ...', inject([PlayerHistoryUtilsService], (service: PlayerHistoryUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
