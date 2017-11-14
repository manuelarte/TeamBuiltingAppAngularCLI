import { Injectable }     from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import {Page} from "../page";
import {environment} from "../../environments/environment";
import {Player} from "../player";
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PlayerSearchService {

    private backendUrl = `${environment.backendPlayersUrl}`;

    constructor(private httpClient: HttpClient) {
    }

    search$(term: string): Observable<Page<Player>> {
        return this.httpClient
            .get<Page<Player>>(`${this.backendUrl}/players?name=${term}`);
    }

}
