import 'hammerjs';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {Http, HttpModule, RequestOptions} from '@angular/http';
import {AgmCoreModule} from '@agm/core';

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
import {Auth} from './services/auth-service';
import {LoginService} from './services/login.service';
import {PlayerHistoryService} from './services/player-history.service';
import {PlayerToTeamSportService} from './services/player-to-team-sport.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TeambuiltingSharedModule} from './shared/shared.module';
import { UUID } from 'angular2-uuid';
import {CdkTableModule} from '@angular/cdk';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        tokenName: 'id_token',
    }), http, options);
}

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        CdkTableModule,
        FlexLayoutModule,
        HttpModule,
        MaterialModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAnvqOUmUsKviVfAP6TDv6eTj6nAzaCmw4'
        }),
        HomeModule,
        ProfileModule,
        TeambuiltingSharedModule,
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
        UUID,
        Auth,
        LoginService,
        PlayerHistoryService,
        PlayerToTeamSportService,
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
