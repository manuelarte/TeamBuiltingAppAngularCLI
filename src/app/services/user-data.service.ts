import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import {AuthHttp} from 'angular2-jwt';
import {UserData} from '../user-data';
import {environment} from '../../environments/environment';

@Injectable()
export class UserDataService {

  private backendPlayersUrl = `${environment.backendPlayersUrl}`;
  private backendTeamsUrl = `${environment.backendTeamsUrl}`;

  private userPlayerUrl = this.backendPlayersUrl + '/players/user/';

  private userTeamsUrl = this.backendTeamsUrl + '/user/';

  constructor(private authHttp: AuthHttp) { }

  getUserPlayerData(): Promise<UserData> {
    return this.authHttp.get(this.userPlayerUrl).map(response => <UserData> response.json())
      .toPromise();
  }

  getUserTeamsData(): Promise<UserData> {
    return this.authHttp.get(this.userTeamsUrl).map(response => <UserData> response.json())
            .toPromise();
  }

}
