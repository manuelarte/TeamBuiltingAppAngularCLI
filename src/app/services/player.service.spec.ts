import { TestBed, inject } from '@angular/core/testing';

import { PlayerService } from './player.service';
import {BaseRequestOptions, Http} from "@angular/http";

import { MockBackend } from '@angular/http/testing';
import {AuthHttp} from "angular2-jwt";

const mockHttpProvider = {
    deps: [ MockBackend, BaseRequestOptions ],
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
};

describe('PlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerService, { provide: Http, useValue: mockHttpProvider }, { provide: AuthHttp, useValue: mockHttpProvider }]
    });
  });

  it('should ...', inject([PlayerService], (service: PlayerService) => {
    expect(service).toBeTruthy();
  }));
});
