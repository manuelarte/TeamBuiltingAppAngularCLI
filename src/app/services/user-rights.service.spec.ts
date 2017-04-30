import { TestBed, inject } from '@angular/core/testing';

import { UserRightsService } from './user-rights.service';

describe('UserRightsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRightsService]
    });
  });

  it('should ...', inject([UserRightsService], (service: UserRightsService) => {
    expect(service).toBeTruthy();
  }));
});
