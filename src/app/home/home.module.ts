import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {HomeComponent} from './home.component';
import {TeamModule} from '../team/team.module';
import {RatingModule} from 'primeng/components/rating/rating';
import {StatisticsComponent} from '../statistics/statistics.component';
import {RateAndCommentsComponent} from '../rate-and-comments/rate-and-comments.component';
import {PodiumComponent} from '../statistics/podium/podium.component';
import {CommonModule} from '@angular/common';
import {PlayerModule} from '../player/player.module';
import {MdButtonModule, MdCardModule, MdCheckboxModule, MdInputModule} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProfileModule} from '../profile/profile.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HomeIntroComponent} from './home-intro/home-intro.component';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RatingModule,
        TeamModule,
        PlayerModule,
        ProfileModule,
        // Material Modules
        MdCardModule,
        MdButtonModule,
        MdCheckboxModule,
        MdInputModule,
    ],
    declarations: [
        HomeComponent,
        HomeIntroComponent,
        StatisticsComponent,
        RateAndCommentsComponent,
        PodiumComponent
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'nl'},
    ],
    exports: [HomeComponent]
})
export class HomeModule {
}
