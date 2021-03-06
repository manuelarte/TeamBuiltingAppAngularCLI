import { Injectable } from '@angular/core';
import {Http, RequestOptions, RequestOptionsArgs} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {environment} from '../../environments/environment';
import {AuthHttp} from 'angular2-jwt';
import {MatchEventSchemaAndUi} from '../match/match-events';
import {Match} from '../match/match';
import {IncomingMatchFeedback, MatchFeedback} from '../match-feedback/match-feedback';
import {Observable} from 'rxjs/Observable';
import {Page} from '../page';

@Injectable()
export class MatchService {

  private backendMatchesUrl = `${environment.backendMatchesUrl}`;
  private backendExperienceUrl = `${environment.backendExperienceUrl}`;

  private matchesUrl = this.backendMatchesUrl + '/matches';
  private matchEventsUrl = this.backendMatchesUrl + '/matches/events';
  private matchFeedbackUrl: string = this.backendExperienceUrl + '/matchFeedback';

  constructor(private http: Http, private authHttp: AuthHttp) { }

  getMatch(id: string): Promise<Match> {
    return this.http.get(`${this.matchesUrl}/${id}`).map(response => <Match> response.json())
            .toPromise();
  }

  getMatchesForDatesAndPlayerId(from?: Date, to?: Date, playerId?: number): Observable<Page<Match>> {
    const myParams = new URLSearchParams();
    if (from) {
        myParams.append('from', from.format('YYYY-MM-dd'));
    }
    if (to) {
      myParams.append('from', to.format('YYYY-MM-dd'));
    }
    if (playerId) {
      myParams.append('playerId', playerId.toString());
    }

    let options = new RequestOptions({ params: myParams });
    return this.http.get(`${this.matchesUrl}`, options).map(response => <Page<Match>> response.json());
  }

  getMatchEvents(): Promise<MatchEventSchemaAndUi> {
    return this.http.get(`${this.matchEventsUrl}`).map(response => <MatchEventSchemaAndUi> response.json())
      .toPromise();
  }

  getMatchRewardsForSport(sportName: string): Promise<string[]> {
    const options: RequestOptionsArgs = {params: {sport: sportName}};
    return this.http.get(`${this.matchFeedbackUrl}/rewards`, options).map(response => <string[]> response.json()).toPromise();
  }

  getMatchFeedback(matchId: string): Promise<MatchFeedback[]> {
    return this.http.get(`${this.matchFeedbackUrl}?matchId=${matchId}`)
        .map(response => <MatchFeedback[]> response.json()).toPromise();
  }

  getMyMatchFeedback(matchId: string): Promise<IncomingMatchFeedback> {
    return this.authHttp.get(`${this.matchFeedbackUrl}/me?matchId=${matchId}`)
          .map(response => <IncomingMatchFeedback> response.json()).toPromise();
  }

  saveMatch(match: Match): Observable<Match> {
    return this.authHttp.post(this.matchesUrl, match).map(response => <Match> response.json())
  }

  saveMatchFeedback(incomingMatchFeedback: IncomingMatchFeedback): Promise<IncomingMatchFeedback> {
    return this.authHttp.post(`${this.matchFeedbackUrl}`, incomingMatchFeedback).map(response => <IncomingMatchFeedback> response.json())
      .toPromise();
  }

}
