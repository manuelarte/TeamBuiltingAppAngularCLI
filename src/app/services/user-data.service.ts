import { Injectable }    from '@angular/core';

import 'rxjs/add/operator/toPromise';

import {UserData} from "../user-data";
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";

@Injectable()
export class UserDataService {

  private backendUrl: string = `${environment.backendCoreUrl}`;
  private usersUrl = this.backendUrl + '/users/';

  constructor(private http: Http) { }

  getUserData(): Promise<UserData> {
    return this.http.get(this.usersUrl).map(response => <UserData> response.json())
      .toPromise();
  }

  updateUserData(userData: any): Promise<UserData> {
    return this.http.post(this.usersUrl, userData).map(response => <UserData> response.json())
         .toPromise();
  }



}
