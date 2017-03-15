import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { AboutComponent } from "./about/about.component";
import {GalleriaModule} from "primeng/primeng";
import {HomeModule} from "./home/home.module";

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
    ],
    imports: [
        GalleriaModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        ROUTING,
        HomeModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
