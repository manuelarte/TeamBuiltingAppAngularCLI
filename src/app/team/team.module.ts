import {NgModule, LOCALE_ID} from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AgmCoreModule} from '@agm/core';

import {TeamDetailComponent} from './team-detail/team-detail.component';
import {PlayerModule} from '../player/player.module';
import {TeamInGoogleMapsComponent} from './team-in-google-maps/team-in-google-maps.component';
import {TeamDetailSportIntroComponent} from './team-detail/team-detail-sport-intro/team-detail-sport-intro.component';
import {TeamRoutingModule} from './team-routing.module';
import {CommonModule} from '@angular/common';
import {ErrorHandlingModule} from '../error-handling/error-handling.module';
import {MdProgressSpinnerModule, MdProgressBarModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
    imports: [
        HttpClientModule,
        TeamRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AgmCoreModule,
        // Material
        MdProgressSpinnerModule,
        MdProgressBarModule,
        // App Modules
        PlayerModule,
        ErrorHandlingModule,
    ],
    declarations: [
        TeamDetailComponent,
        TeamDetailSportIntroComponent,
        TeamInGoogleMapsComponent,
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'en'},
    ],
    exports: [TeamDetailComponent]
})
export class TeamModule {
}
