import {NgModule, LOCALE_ID} from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AgmCoreModule} from '@agm/core';

import {TeamDetailComponent} from './team-detail/team-detail.component';
import {PlayerModule} from '../player/player.module';
import {TeamInGoogleMapsComponent} from './team-in-google-maps/team-in-google-maps.component';
import {TeamDetailSportIntroComponent} from './team-detail/team-detail-sport-intro/team-detail-sport-intro.component';
import {TeamRoutingModule} from './team-routing.module';
import {CommonModule} from '@angular/common';
import {ErrorHandlingModule} from '../error-handling/error-handling.module';
import {MdProgressSpinnerModule, MdProgressBarModule} from '@angular/material';


@NgModule({
    imports: [
        TeamRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
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
        {provide: LOCALE_ID, useValue: 'nl'},
    ],
    exports: [TeamDetailComponent]
})
export class TeamModule {
}
