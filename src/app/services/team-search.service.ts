import { Injectable }     from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import {Team} from "../team";
import {Page} from "../page";
import {environment} from "../../environments/environment";
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TeamSearchService {

  private backendUrl: string = `${environment.backendTeamsUrl}`;

  constructor(private httpClient: HttpClient) {}

  search$(term: string): Observable<Page<Team>> {
    return this.httpClient
               .get<Page<Team>>(`${this.backendUrl}?name=${term}`)
               .map(this.convertFromDatesAndToDatesForArray);
  }


  private convertFromDatesAndToDatesForArray(data: Page<Team>): Page<Team> {
      data.content.forEach(team => {
          team.fromDate = new Date(team.fromDate);
          if (team.toDate) {
              team.toDate = new Date(team.toDate);
          }
      });
      return data;
  }

}
