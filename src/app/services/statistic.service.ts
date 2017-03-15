import { Injectable }    from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import {Page} from "../page";
import {TeamStatistic} from "../team-statistic";
import {environment} from "../../environments/environment";

@Injectable()
export class StatisticService {

  private backendUrl: string = `${environment.backendStatisticsUrl}`;
  private statisticsTeamsUrl = this.backendUrl + '/teams';

  constructor(private http: Http) { }

  getTeamsMostVisited(): Promise<Page<TeamStatistic>> {
      return this.http.get(`${this.statisticsTeamsUrl}`).map(response => response.json())
          .toPromise();
  }

}
