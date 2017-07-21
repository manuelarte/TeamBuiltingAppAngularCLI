import { TestBed, inject } from '@angular/core/testing';

import { TeamInfoUtilService } from './team-info-util.service';

describe('TeamInfoUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamInfoUtilService]
    });
  });

  it('should be created', inject([TeamInfoUtilService], (service: TeamInfoUtilService) => {
    expect(service).toBeTruthy();
  }));
});
