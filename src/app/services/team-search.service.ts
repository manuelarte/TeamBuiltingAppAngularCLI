import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import {Team} from "../team";
import {Page} from "../page";
import {environment} from "../../environments/environment";

@Injectable()
export class TeamSearchService {

  private backendUrl: string = `${environment.backendCoreUrl}`;

  constructor(private http: Http) {}

  search(term: string): Observable<Page<Team>> {
    return this.http
               .get(`${this.backendUrl}/teams?name=${term}`)
               .map((r: Response) => this.convertFromDatesAndToDatesForArray(r) as Page<Team>);
  }


  private convertFromDatesAndToDatesForArray(res: Response) {
      let data = res.json() || {};
      data.content.forEach(d => {
          d.fromDate = new Date(d.fromDate);
          if (d.toDate) {
              d.toDate = new Date(d.toDate);
          }
      });
      return data;
  }

}
