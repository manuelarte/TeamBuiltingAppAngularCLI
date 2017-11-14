import { Injectable }    from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import {PlayerReward} from "../player-reward";
import {environment} from "../../environments/environment";
import {AuthHttp} from "angular2-jwt";
import {HttpClient} from '@angular/common/http';
import {Timeslice} from '../timeslice';

@Injectable()
export class PlayerRewardsService {

  private backendUrl: string = `${environment.backendExperienceUrl}`;
  private rewardsPrefix = '/rewards';
  private playersUrl = this.backendUrl + this.rewardsPrefix + '/players';

  constructor(private httpClient: HttpClient, private authHttp: AuthHttp) { }

  getPlayerRewards(playerId: number): Promise<PlayerReward[]> {
    return this.httpClient.get<PlayerReward[]>(`${this.playersUrl}/${playerId}`).map(this.convertFromDatesAndToDatesForArray)
      .toPromise();
  }

  postNewPlayerReward(playerReward: PlayerReward): Promise<PlayerReward> {
      return this.authHttp.post(`${this.backendUrl}${this.rewardsPrefix}`, playerReward).map(this.convertFromDateAndToDate).toPromise();
  }

  deletePlayerReward(id: string): Promise<any> {
      return this.authHttp.delete(`${this.playersUrl}/${id}`).toPromise();
  }

  getRewards(): Promise<string[]> {
      return this.httpClient.get<string[]>(`${this.backendUrl}${this.rewardsPrefix}`).toPromise();
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
        let data = value.json() || {};
        data.fromDate = new Date(data.fromDate);
        if (data.toDate) {
            data.toDate = new Date(data.toDate);
        }
        return data;
    }



}
