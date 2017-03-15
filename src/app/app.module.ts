import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { AboutComponent } from "./about/about.component";
import {GalleriaModule} from "primeng/primeng";
import {HomeModule} from "./home/home.module";
import {AppRoutingModule} from "./app-routing.module";
import { TeamDetailComponent } from './team/team-detail/team-detail.component';

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
        HomeModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
