import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {User} from "../user";
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {

    private backendUrl: string = `${environment.backendUsersUrl}`;
    private usersUrl = this.backendUrl + '/users/';

    constructor(private httpClient: HttpClient) {}

    public getUser(user_id: string): Promise<User> {
        return this.httpClient.get<User>(`${this.usersUrl}/${user_id}`).toPromise();
    }

}
