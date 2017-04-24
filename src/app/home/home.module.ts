import {NgModule, LOCALE_ID} from '@angular/core';
import {ClarityModule} from 'clarity-angular';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {HomeComponent} from "./home.component";
import {GalleriaModule} from "primeng/primeng";
import {TeamModule} from "../team/team.module";
import {RatingModule} from "primeng/components/rating/rating";
import {StatisticsComponent} from "../statistics/statistics.component";
import {RateAndCommentsComponent} from "../rate-and-comments/rate-and-comments.component";
import {PodiumComponent} from "../statistics/podium/podium.component";
import {CommonModule} from "@angular/common";
import {PlayerModule} from "../player/player.module";
import {StepsModule} from 'primeng/primeng';
import {MdButtonModule, MdCheckboxModule, MdInputModule} from "@angular/material";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpModule,
        ClarityModule,
        GalleriaModule,
        StepsModule,
        RatingModule,
        TeamModule,
        PlayerModule,
        MdButtonModule,
        MdCheckboxModule,
        MdInputModule,
    ],
    declarations: [
        HomeComponent,
        StatisticsComponent,
        RateAndCommentsComponent,
        PodiumComponent
    ],
    providers: [
        {provide: LOCALE_ID, useValue: "nl"},
    ],
    exports: [HomeComponent]
})
export class HomeModule {
}
