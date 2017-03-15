import { Injectable }      from '@angular/core';
import {tokenNotExpired, AuthHttp} from 'angular2-jwt';
import {myConfig} from "./auth.config";
import {URLSearchParams} from "@angular/http";

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {

    usersUrl: string = "https://manuelarte.eu.auth0.com/api/v2/users";

    // Configure Auth0
    lock = new Auth0Lock(myConfig.clientID, myConfig.domain, {
        auth: {
            params: {
                scope: 'openid user_id email given_name family_name nickname picture roles user_metadata read:users'
            },
        }
    });

    //Store profile object in auth class
    userProfile: any;

    constructor(private authHttp: AuthHttp) {

        // Set userProfile attribute of already saved profile
        this.userProfile = JSON.parse(localStorage.getItem('profile'));

        // Add callback for the Lock `authenticated` event
        this.lock.on("authenticated", (authResult) => {
            localStorage.setItem('id_token', authResult.idToken);

            // Fetch profile information
            this.lock.getProfile(authResult.idToken, (error, profile) => {
                if (error) {
                    // Handle error
                    alert(error);
                    return;
                }

                localStorage.setItem('profile', JSON.stringify(profile));
                this.userProfile = profile;
            });
        });
    }

    public login() {
        // Call the show method to display the widget.
        this.lock.show();
    };

    public authenticated() {
        // Check if there's an unexpired JWT
        // It searches for an item in localStorage with key == 'id_token'
        return tokenNotExpired();
    };

    public getClient(id: string): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('fields', "user_id,email,name,nickname,picture");
        return this.authHttp.get(`${this.usersUrl}/${id}`, params).map(response => response.json()).toPromise();
    }

    public logout() {
        // Remove token and profile from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.userProfile = undefined;
    };
}
