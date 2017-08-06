import { Injectable } from '@angular/core';
import {myConfig} from './auth.config';
import {LoginService} from './login.service';

import * as auth0 from 'auth0-js';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable()
export class Auth {

    usersUrl = 'https://manuelarte.eu.auth0.com/api/v2/users';

    options: any = {
        allowedConnections: ['google-oauth2', 'facebook'],
        // socialButtonStyle: 'small',
        theme: {
            primaryColor: '#31324F'
        }
    };

    auth0 = new auth0.WebAuth({
        clientID: myConfig.clientID,
        domain: myConfig.domain,
        responseType: 'token id_token',
        audience: 'https://manuelarte.eu.auth0.com/userinfo',
        redirectUri: environment.redirectUri,
        scope: 'openid profile roles app_metadata user_metadata user_id email given_name family_name nickname'
    });


    // Store profile object in auth class
    userProfile: any;

    constructor(private loginService: LoginService, public router: Router) {
        // Set userProfile attribute of already saved profile
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
    }

    public login() {
        // Call the show method to display the widget.
        this.auth0.authorize();
    };

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.setSession(authResult);
                this.loginService.loginEvent();
                this.getProfile((err, profile) => {
                    console.log('Profile:', profile);
                    localStorage.setItem('profile', JSON.stringify(profile));
                    this.router.navigate(['/home']);
                });

            } else if (err) {
                this.router.navigate(['/home']);
                console.log(err);
            }
        });
    }

    private setSession(authResult): void {
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');

        localStorage.removeItem('profile');
        this.userProfile = undefined;
        // Go back to the home route
        this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    public getProfile(cb): void {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('Access token must exist to fetch profile');
        }

        const self = this;
        this.auth0.client.userInfo(accessToken, (err, profile) => {
            if (profile) {
                self.userProfile = profile;
            }
            cb(err, profile);
        });
    }
}
