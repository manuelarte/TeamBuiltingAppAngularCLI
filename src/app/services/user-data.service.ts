import { Injectable }    from '@angular/core';

import 'rxjs/add/operator/toPromise';

import {AuthHttp} from "angular2-jwt";
import {Auth} from "./auth-service";
import {UserData} from "../user-data";
import {environmentConfig} from "./environment.config";

@Injectable()
export class UserDataService {

  private backendUrl: string = `${environmentConfig.backendCoreUrl}`;
  private usersUrl = this.backendUrl + '/users/';

  constructor(private auth: Auth, private authHttp: AuthHttp) { }

  getUserData(): Promise<UserData> {
    return this.authHttp.get(this.usersUrl).map(response => <UserData> response.json())
      .toPromise();
  }

  updateUserData(userData: any): Promise<UserData> {
    return this.authHttp.post(this.usersUrl, userData).map(response => <UserData> response.json())
         .toPromise();
  }



}
