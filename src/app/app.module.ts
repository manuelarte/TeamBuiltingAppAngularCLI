import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, Http, RequestOptions} from '@angular/http';
import {AgmCoreModule} from "angular2-google-maps/core";
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { AboutComponent } from "./about/about.component";
import {GalleriaModule} from "primeng/primeng";
import {HomeModule} from "./home/home.module";
import {AppRoutingModule} from "./app-routing.module";

import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        tokenName: 'id_token',
    }), http, options);
}

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
    ],
    imports: [
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAnvqOUmUsKviVfAP6TDv6eTj6nAzaCmw4'
        }),
        GalleriaModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        HomeModule,
        AppRoutingModule,
    ],
    providers: [
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
