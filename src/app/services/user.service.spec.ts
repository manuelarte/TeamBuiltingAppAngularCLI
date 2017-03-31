import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import {BaseRequestOptions, Http} from "@angular/http";
import {MockBackend} from "@angular/http/testing";

const mockHttpProvider = {
    deps: [ MockBackend, BaseRequestOptions ],
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
};

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, { provide: Http, useValue: mockHttpProvider }]
    });
  });

  it('should ...', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
