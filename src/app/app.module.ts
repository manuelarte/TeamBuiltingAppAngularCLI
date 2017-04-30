import 'hammerjs';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ClarityModule} from 'clarity-angular';

import {AppComponent} from './app.component';
import {Http, HttpModule, RequestOptions} from '@angular/http';
import {AgmCoreModule} from 'angular2-google-maps/core';

import {DonateComponent} from './donate/donate.component';
import {ProfileModule} from './profile/profile.module';
import {HomeModule} from './home/home.module';
import {AppRoutingModule} from './app-routing.module';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {ErrorHandlingModule} from './error-handling/error-handling.module';
import {MaterialModule} from '@angular/material';
import { ProfileSidenavComponent } from './profile-sidenav/profile-sidenav.component';
import { ToolbarMenuComponent } from './toolbar-menu/toolbar-menu.component';
import {TeamCudDialogComponent} from './team-cud-dialog/team-cud-dialog.component';
import { SettingsComponent } from './settings/settings.component';
import {Auth} from "./services/auth-service";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        tokenName: 'id_token',
    }), http, options);
}

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpModule,
        ClarityModule.forRoot(),
        MaterialModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAnvqOUmUsKviVfAP6TDv6eTj6nAzaCmw4'
        }),
        HomeModule,
        ProfileModule,
        ErrorHandlingModule,
    ],
    declarations: [
        AppComponent,
        DonateComponent,
        ProfileSidenavComponent,
        ToolbarMenuComponent,
        TeamCudDialogComponent,
        SettingsComponent,
    ],
    entryComponents: [TeamCudDialogComponent],
    providers: [
        Auth,
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
