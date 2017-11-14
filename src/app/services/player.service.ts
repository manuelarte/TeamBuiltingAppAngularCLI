import { Injectable } from '@angular/core';
import {Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {Player} from '../player';
import {PlayerToTeam} from '../player-to-team';
import {PlayerToTeamSportDetails} from '../player-to-team-sport-details';
import {environment} from '../../environments/environment';
import {AuthHttp} from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Timeslice} from '../timeslice';

@Injectable()
export class PlayerService {

  private backendPlayersUrl = `${environment.backendPlayersUrl}`;

  private backendSportsUrl = `${environment.backendSportsUrl}`;

  private playerUrl = this.backendPlayersUrl + '/players';
  private playerToTeamUrl = this.backendPlayersUrl + '/playersToTeams';
  private sportsUrl: string = this.backendSportsUrl;

  constructor(private httpClient: HttpClient, private authHttp: AuthHttp) { }

  getPlayer(id: number): Promise<Player> {
    return this.getPlayerObservable(id).toPromise();
  }

  getPlayerObservable(id: number): Observable<Player> {
    return this.httpClient.get<Player>(`${this.playerUrl}/${id}`);
  }

  savePlayer(player: Player): Promise<Player> {
      return this.authHttp.post(this.playerUrl, player).map(response => <Player> response.json()).toPromise();
  }

  deletePlayer(playerId: number): Promise<any> {
      return this.authHttp.delete(`${this.playerUrl}/${playerId}`).toPromise();
  }

  getPlayerToTeamSportDetails(playerId: number): Promise<PlayerToTeamSportDetails[]> {
    return this.httpClient.get<PlayerToTeamSportDetails[]>(`${this.sportsUrl}/players?playerId=${playerId}`).toPromise();
  }

  getPlayerToTeamSportDetailsFor(playerId: string, sport: string): Promise<PlayerToTeamSportDetails> {
      return this.httpClient.get<PlayerToTeamSportDetails>(`${this.sportsUrl}/players/${sport}?playerId=${playerId}`)
          .toPromise();
  }

  savePlayerToTeamSportDetails(playerToTeamSportDetails: PlayerToTeamSportDetails): Promise<PlayerToTeamSportDetails> {
    return this.authHttp.post(`${this.sportsUrl}/players/`, playerToTeamSportDetails)
        .map(response => <PlayerToTeamSportDetails> response.json()).toPromise();
  }

  deletePlayerToTeamSportDetails(playerToTeamSportDetails: PlayerToTeamSportDetails): Promise<Response> {
    return this.authHttp.delete(`${this.sportsUrl}/players/${playerToTeamSportDetails.id}`).toPromise();
  }

  getPlayerHistory(playerId: string): Promise<PlayerToTeam[]> {
    return this.httpClient.get<PlayerToTeam[]>(`${this.playerToTeamUrl}?playerId=${playerId}`).map(this.convertFromDatesAndToDatesForArray)
      .toPromise();
  }

  savePlayerToTeam(playerToTeam: PlayerToTeam): Promise<PlayerToTeam> {
    return this.authHttp.post(`${this.playerToTeamUrl}`, playerToTeam).map(this.convertFromDateAndToDate)
      .toPromise();
  }

  deletePlayerToTeam(playerToTeam: PlayerToTeam): Promise<Response> {
      return this.authHttp.delete(`${this.playerToTeamUrl}/${playerToTeam.id}`).toPromise();
  }

  private convertFromDatesAndToDatesForArray<T extends Timeslice>(data: T[]) {
    data.forEach(d => {
        d.fromDate = new Date(d.fromDate);
        if (d.toDate) {
            d.toDate = new Date(d.toDate);
        }
    });
    return data;
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
