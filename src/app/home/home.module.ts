import {NgModule, LOCALE_ID} from '@angular/core';
import {ClarityModule} from 'clarity-angular';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AUTH_PROVIDERS} from "angular2-jwt";
import {TranslateModule} from "ng2-translate";

import {HomeComponent} from "./home.component";
import {HomeHowToComponent} from "./home-how-to/home-how-to.component";
import {HomeHowToIntroductionComponent} from "./home-how-to/home-how-to-introduction/home-how-to-introduction.component";
import {HomeHowToLoginComponent} from "./home-how-to/home-how-to-login/home-how-to-login.component";
import {HomeHowToWhatToDoComponent} from "./home-how-to/home-how-to-what-to-do/home-how-to-what-to-do.component";
import {InsideHowToComponent} from "./home-how-to/inside-how-to/inside-how-to.component";
import {GalleriaModule} from "primeng/primeng";
import {TeamModule} from "../team/team.module";
import {RatingModule} from "primeng/components/rating/rating";
import {StatisticsComponent} from "../statistics/statistics.component";
import {RateAndCommentsComponent} from "../rate-and-comments/rate-and-comments.component";
import {PodiumComponent} from "../statistics/podium/podium.component";
import {CommonModule} from "@angular/common";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        TranslateModule.forRoot(),
        ClarityModule,
        GalleriaModule,
        RatingModule,
        TeamModule,
    ],
    declarations: [
        HomeComponent,
        HomeHowToComponent,
        HomeHowToIntroductionComponent,
        HomeHowToLoginComponent,
        HomeHowToWhatToDoComponent,
        InsideHowToComponent,
        StatisticsComponent,
        RateAndCommentsComponent,
        PodiumComponent
    ],
    providers: [
        {provide: LOCALE_ID, useValue: "nl"},
        AUTH_PROVIDERS
    ],
    exports: [HomeComponent]
})
export class HomeModule {
}
