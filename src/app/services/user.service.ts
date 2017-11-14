import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";
import {User} from "../user";
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {

    private backendUrl: string = `${environment.backendUsersUrl}`;
    private usersUrl = this.backendUrl + '/users/';

    constructor(private httpClient: HttpClient) {}

    public getUser$(user_id: string): Observable<User> {
        return this.httpClient.get<User>(`${this.usersUrl}/${user_id}`);
    }

}
