import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";
import {User} from "../user";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

    private backendUrl: string = `${environment.backendUsersUrl}`;
    private usersUrl = this.backendUrl + '/users/';

    constructor(private http: Http) {}

    public getUser$(user_id: string): Observable<User> {
        return this.http.get(`${this.usersUrl}/${user_id}`).map(response => response.json());
    }

}
