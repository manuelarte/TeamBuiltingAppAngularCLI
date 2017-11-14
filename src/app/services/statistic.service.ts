import { Injectable }    from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import {Page} from "../page";
import {TeamStatistic} from "../team-statistic";
import {environment} from "../../environments/environment";
import {HttpClient} from '@angular/common/http';

@Injectable()
export class StatisticService {

  private backendUrl: string = `${environment.backendStatisticsUrl}`;
  private statisticsTeamsUrl = this.backendUrl + '/teams';

  constructor(private httpClient: HttpClient) { }

  getTeamsMostVisited(): Promise<Page<TeamStatistic>> {
      return this.httpClient.get<Page<TeamStatistic>>(`${this.statisticsTeamsUrl}`).toPromise();
  }

}
