import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {Player} from '../player';
import {PlayerToTeam} from '../player-to-team';
import {PlayerToTeamSportDetails} from '../player-to-team-sport-details';
import {environment} from '../../environments/environment';
import {AuthHttp} from 'angular2-jwt';
import {MatchEventSchemaAndWidget} from '../match/match-events';

@Injectable()
export class MatchService {

  private backendMatchesUrl = `${environment.backendMatchesUrl}`;

  private matchEventsUrl = this.backendMatchesUrl + '/matches/events';

  constructor(private http: Http, private authHttp: AuthHttp) { }

  getMatchEvents(): Promise<MatchEventSchemaAndWidget> {
    return this.http.get(`${this.matchEventsUrl}`).map(response => <MatchEventSchemaAndWidget> response.json())
      .toPromise();
  }

}
