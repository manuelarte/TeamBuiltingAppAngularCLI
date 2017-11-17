import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {environment} from '../../environments/environment';
import {AuthHttp} from 'angular2-jwt';
import {MatchEventSchemaAndUi} from '../match/match-events';
import {Match} from '../match/match';
import {IncomingMatchFeedback, MatchFeedback} from '../match-feedback/match-feedback';
import {Observable} from 'rxjs/Observable';
import {Page} from '../page';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class MatchService {

  private backendMatchesUrl = `${environment.backendMatchesUrl}`;
  private backendExperienceUrl = `${environment.backendExperienceUrl}`;

  private matchesUrl = this.backendMatchesUrl + '/matches';
  private matchEventsUrl = this.backendMatchesUrl + '/matches/events';
  private matchFeedbackUrl: string = this.backendExperienceUrl + '/matchFeedback';

  constructor(private httpClient: HttpClient, private authHttp: AuthHttp) { }

  getMatch(id: string): Promise<Match> {
    return this.httpClient.get<Match>(`${this.matchesUrl}/${id}`).toPromise();
  }

  getMatchesForDatesAndPlayerId(from?: Date, to?: Date, playerId?: number): Observable<Page<Match>> {
    const myParams = new HttpParams();
    if (from) {
        myParams.append('from', from.format('YYYY-MM-dd'));
    }
    if (to) {
      myParams.append('from', to.format('YYYY-MM-dd'));
    }
    if (playerId) {
      myParams.append('playerId', playerId.toFixed());
    }

    let options = { params: myParams };
    return this.httpClient.get<Page<Match>>(`${this.matchesUrl}`, options);
  }

  getMatchEvents(): Promise<MatchEventSchemaAndUi> {
    return this.httpClient.get<MatchEventSchemaAndUi>(`${this.matchEventsUrl}`).toPromise();
  }

  getMatchRewardsForSport(sportName: string): Promise<string[]> {
    const params: HttpParams = new HttpParams();
    params.append('sport', sportName);
    const options = {params: params};
    return this.httpClient.get<string[]>(`${this.matchFeedbackUrl}/rewards`, options).toPromise();
  }

  getMatchFeedback(matchId: string): Promise<MatchFeedback[]> {
    return this.httpClient.get<MatchFeedback[]>(`${this.matchFeedbackUrl}?matchId=${matchId}`).toPromise();
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
