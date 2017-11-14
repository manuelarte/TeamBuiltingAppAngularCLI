import { Injectable }     from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {Team} from "../team";
import {Page} from "../page";
import {environment} from "../../environments/environment";
import {HttpClient} from '@angular/common/http';
import {Timeslice} from '../timeslice';

@Injectable()
export class TeamSearchService {

  private backendUrl: string = `${environment.backendTeamsUrl}`;

  constructor(private httpClient: HttpClient) {}

  search(term: string): Observable<Page<Team>> {
    return this.httpClient
               .get<Page<Team>>(`${this.backendUrl}?name=${term}`)
               .map(this.convertFromDatesAndToDatesForArray);
  }


  private convertFromDatesAndToDatesForArray<T extends Timeslice>(data: Page<T>) {
      data.content.forEach(d => {
          d.fromDate = new Date(d.fromDate);
          if (d.toDate) {
              d.toDate = new Date(d.toDate);
          }
      });
      return data;
  }

}
