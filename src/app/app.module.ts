import {NgModule, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ClarityModule} from 'clarity-angular';

import {AppComponent} from './app.component';
import {AboutComponent} from './about/about.component';
import {HttpModule} from "@angular/http";
import {AgmCoreModule} from "angular2-google-maps/core";

import {AUTH_PROVIDERS} from "angular2-jwt";
import {TranslateModule} from "ng2-translate";
import {DonateComponent} from "./donate/donate.component";
import {ProfileModule} from "./profile/profile.module";
import {HomeModule} from "./home/home.module";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpModule,
        TranslateModule.forRoot(),
        ClarityModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAnvqOUmUsKviVfAP6TDv6eTj6nAzaCmw4'
        }),
        HomeModule,
        ProfileModule,
    ],
    declarations: [
        AppComponent,
        AboutComponent,
        DonateComponent,
    ],
    providers: [
        {provide: LOCALE_ID, useValue: "nl"},
        AUTH_PROVIDERS
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
