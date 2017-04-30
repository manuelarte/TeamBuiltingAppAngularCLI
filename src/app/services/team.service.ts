import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {Team} from '../team';
import {Player} from '../player';
import {AuthHttp} from 'angular2-jwt';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {PlayerToTeam} from "../player-to-team";


@Injectable()
export class TeamService {

  private backendTeamsUrl = `${environment.backendTeamsUrl}`;
  private backendPlayersUrl = `${environment.backendPlayersUrl}`;
  private teamUrl = this.backendTeamsUrl + '/';
  private playerToTeamsUrl: string = this.backendPlayersUrl + '/playersToTeams'

  constructor(private http: Http, private authHttp: AuthHttp) { }

  getTeam(id: string): Promise<Team> {
    return this.http.get(this.teamUrl + id).map(this.convertFromDateAndToDate).toPromise();
  }

  postTeam(team: Team): Promise<Team> {
      return this.authHttp.post(this.teamUrl, team).map(this.convertFromDateAndToDate).toPromise();
  }

  postTeamObservable(team: Team): Observable<Team> {
        return this.authHttp.post(this.teamUrl, team).map(this.convertFromDateAndToDate);
  }

  getPlayers(id: string, date: string = null): Promise<PlayerToTeam[]> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('date', date);
    return this.http.get(`${this.playerToTeamsUrl}/teams/${id}`, {search: params}).map(response => <PlayerToTeam[]> response.json())
      .toPromise();
  }

  private convertFromDateAndToDate(value: any) {
    const data = value.json() || {};
    data.fromDate = new Date(data.fromDate);
    if (data.toDate) {
      data.toDate = new Date(data.toDate);
    }
    return data;
  }

}
