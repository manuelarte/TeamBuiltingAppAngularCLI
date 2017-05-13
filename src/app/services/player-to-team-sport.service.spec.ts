import { TestBed, inject } from '@angular/core/testing';

import { PlayerToTeamSportService } from './player-to-team-sport.service';

describe('PlayerToTeamSportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerToTeamSportService]
    });
  });

  it('should ...', inject([PlayerToTeamSportService], (service: PlayerToTeamSportService) => {
    expect(service).toBeTruthy();
  }));
});
