import {NgModule, LOCALE_ID} from '@angular/core';
import {ClarityModule} from 'clarity-angular';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AgmCoreModule} from "angular2-google-maps/core";

import {InputTextModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';

import {GrowlModule} from "primeng/primeng";
import {DataListModule} from 'primeng/primeng';

import {CalendarModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';
import {TeamSearchComponent} from "./team-search/team-search.component";
import {TeamDetailComponent} from "./team-detail/team-detail.component";
import {PlayerModule} from "../player/player.module";
import {TeamInGoogleMapsComponent} from "./team-in-google-maps/team-in-google-maps.component";
import {TeamCudComponent} from "./team-cud/team-cud.component";
import {TeamCudInsideFormComponent} from "./team-cud/team-cud-inside-form/team-cud-inside-form.component";
import {TeamDetailSportIntroComponent} from "./team-detail/team-detail-sport-intro/team-detail-sport-intro.component";
import {TeamRoutingModule} from "./team-routing.module";
import {CommonModule} from "@angular/common";
import {ErrorHandlingModule} from "../error-handling/error-handling.module";


@NgModule({
    imports: [
        TeamRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ClarityModule,
        AgmCoreModule,
        // PrimeNG modules
        CalendarModule,
        DataListModule,
        DropdownModule,
        GrowlModule,
        InputTextModule,
        MultiSelectModule,
        PlayerModule,
        ErrorHandlingModule,
    ],
    declarations: [
        TeamSearchComponent,
        TeamDetailComponent,
        TeamDetailSportIntroComponent,
        TeamCudComponent,
        TeamCudInsideFormComponent,
        TeamInGoogleMapsComponent,
    ],
    providers: [
        {provide: LOCALE_ID, useValue: "nl"},
    ],
    exports: [TeamSearchComponent, TeamDetailComponent, TeamCudComponent]
})
export class TeamModule {
}
