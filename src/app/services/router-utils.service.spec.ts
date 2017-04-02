import { TestBed, inject } from '@angular/core/testing';

import { RouterUtilsService } from './router-utils.service';

describe('RouterUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterUtilsService]
    });
  });

  it('should ...', inject([RouterUtilsService], (service: RouterUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
