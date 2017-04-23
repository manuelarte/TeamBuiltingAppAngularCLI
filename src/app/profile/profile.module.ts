import {NgModule, LOCALE_ID} from '@angular/core';
import { CommonModule } from '@angular/common'
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
import {PlayerModule} from "../player/player.module";
import {MyAdminTeams} from "./my-admin-teams/my-admin-teams.component";
import {MyPlayerPositionComponent} from "./my-player-position/my-player-position.component";
import {MyPlayerHistoryTableComponent} from "./my-player-history/my-player-history-table/my-player-history-table.component";
import {MyPlayerHistoryComponent} from "./my-player-history/my-player-history.component";
import {MyPlayerProfileComponent} from "./my-player-profile/my-player-profile.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {TeamModule} from "../team/team.module";
import {PlayerToTeamWizardComponent} from "./player-to-team-wizard/player-to-team-wizard.component";
import {PlayerToSportDetailsModalComponent} from "./player-to-sport-details-modal/player-to-sport-details-modal.component";
import {MyPlayerHistoryTableRowComponent} from "./my-player-history/my-player-history-table/my-player-history-table-row/my-player-history-table-row.component";
import {MdButtonModule, MdCheckboxModule, MdInputModule, MdSelectModule} from "@angular/material";
import {TeamCudComponent} from "./team-cud/team-cud.component";
import {TeamCudInsideFormComponent} from "./team-cud/team-cud-inside-form/team-cud-inside-form.component";


@NgModule({
    imports: [
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAnvqOUmUsKviVfAP6TDv6eTj6nAzaCmw4'
        }),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ClarityModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAnvqOUmUsKviVfAP6TDv6eTj6nAzaCmw4'
        }),
        MdButtonModule,
        // PrimeNG modules
        CalendarModule,
        DataListModule,
        DropdownModule,
        GrowlModule,
        InputTextModule,
        MultiSelectModule,
        // Material Modules,
        MdInputModule,
        MdSelectModule,
        MdCheckboxModule,
        // Other modules
        TeamModule,
        PlayerModule,
    ],
    declarations: [
        MyProfileComponent,
        MyPlayerProfileComponent,
        MyPlayerHistoryComponent,
        MyPlayerHistoryTableComponent,
        MyPlayerHistoryTableRowComponent,
        MyPlayerPositionComponent,
        PlayerToTeamWizardComponent,
        PlayerToSportDetailsModalComponent,
        TeamCudComponent,
        TeamCudInsideFormComponent,
        MyAdminTeams,
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'nl'},
    ],
    exports: [TeamCudComponent]
})
export class ProfileModule {
}
