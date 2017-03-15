import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AgmCoreModule} from "angular2-google-maps/core";
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { AboutComponent } from "./about/about.component";
import {GalleriaModule} from "primeng/primeng";
import {HomeModule} from "./home/home.module";
import {AppRoutingModule} from "./app-routing.module";

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
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
