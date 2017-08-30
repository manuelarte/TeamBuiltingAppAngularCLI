import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import {Page} from "../page";
import {environment} from "../../environments/environment";
import {Player} from "../player";

@Injectable()
export class PlayerSearchService {

    private backendUrl = `${environment.backendPlayersUrl}`;

    constructor(private http: Http) {
    }

    search(term: string): Observable<Page<Player>> {
        return this.http
            .get(`${this.backendUrl}/players?name=${term}`)
            .map((r: Response) => this.convertFromDatesAndToDatesForArray(r) as Page<Player>);
    }


    private convertFromDatesAndToDatesForArray(res: Response) {
        const data = res.json() || {};
        data.content.forEach(d => {
            d.fromDate = new Date(d.fromDate);
            if (d.toDate) {
                d.toDate = new Date(d.toDate);
            }
        });
        return data;
    }
}
