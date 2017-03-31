import { TestBed, inject } from '@angular/core/testing';

import { TeamService } from './team.service';
import {BaseRequestOptions, Http} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {AuthHttp} from "angular2-jwt";

const mockHttpProvider = {
    deps: [ MockBackend, BaseRequestOptions ],
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
};

describe('TeamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamService, { provide: Http, useValue: mockHttpProvider }, { provide: AuthHttp, useValue: mockHttpProvider }]
    });
  });

  it('should ...', inject([TeamService], (service: TeamService) => {
    expect(service).toBeTruthy();
  }));
});
