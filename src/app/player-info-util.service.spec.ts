import { TestBed, inject } from '@angular/core/testing';

import { PlayerInfoUtilService } from './player-info-util.service';

describe('PlayerInfoUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerInfoUtilService]
    });
  });

  it('should be created', inject([PlayerInfoUtilService], (service: PlayerInfoUtilService) => {
    expect(service).toBeTruthy();
  }));
});
