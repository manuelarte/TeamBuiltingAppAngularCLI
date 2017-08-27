import { TestBed, inject } from '@angular/core/testing';

import { MatchFeedbackUtilsService } from './match-feedback-utils.service';

describe('MatchFeedbackUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchFeedbackUtilsService]
    });
  });

  it('should be created', inject([MatchFeedbackUtilsService], (service: MatchFeedbackUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
