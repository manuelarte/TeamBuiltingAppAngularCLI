import { TestBed, inject } from '@angular/core/testing';
import {MatchUtilsService} from './match-utils.service';

describe('MatchUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchUtilsService]
    });
  });

  it('should ...', inject([MatchUtilsService], (service: MatchUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
