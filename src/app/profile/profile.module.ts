import {NgModule, LOCALE_ID} from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AgmCoreModule} from '@agm/core';

import {
    MdAutocompleteModule,
    MdButtonModule, MdCheckboxModule, MdIconModule, MdInputModule, MdProgressSpinnerModule,
    MdSelectModule, MdTabsModule
} from '@angular/material';
import {SportModule} from '../sport/sport.module';
import {PlayerCudComponent} from './player-cud/player-cud.component';
import {TeamCudComponent} from './team-cud/team-cud.component';
import {PlayerToSportDetailsModalComponent} from './player-to-sport-details-modal/player-to-sport-details-modal.component';
import {PlayerToSportDetailsCudComponent} from './player-to-sport-details-cud/player-to-sport-details-cud.component';
import {PlayerToTeamCudComponent} from './player-to-team-cud/player-to-team-cud.component';
import {PlayerToSportDetailsCommonCudComponent} from './player-to-sport-details-common-cud/player-to-sport-details-common-cud.component';
import {PlayerToTeamWizardComponent} from './player-to-team-wizard/player-to-team-wizard.component';
import {TeamSearchComponent} from './team-search/team-search.component';
import {PlayerSearchComponent} from './player-search/player-search.component';


@NgModule({
    imports: [
        AgmCoreModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        // Material Modules,
        MdButtonModule,
        MdAutocompleteModule,
        MdInputModule,
        MdSelectModule,
        MdCheckboxModule,
        MdIconModule,
        MdProgressSpinnerModule,
        MdButtonModule,
        MdTabsModule,
        // Other modules
        SportModule,
    ],
    declarations: [
        PlayerCudComponent,
        PlayerToTeamCudComponent,
        TeamCudComponent,
        PlayerToSportDetailsCudComponent,
        PlayerToSportDetailsCommonCudComponent,
        PlayerToSportDetailsModalComponent,
        PlayerToTeamWizardComponent,
        TeamSearchComponent,
        PlayerSearchComponent,
    ],
    entryComponents: [PlayerToSportDetailsModalComponent, PlayerToTeamWizardComponent],
    providers: [
        {provide: LOCALE_ID, useValue: 'nl'},
    ],
    exports: [TeamSearchComponent, PlayerSearchComponent, PlayerCudComponent, PlayerToTeamCudComponent,
        PlayerToSportDetailsCudComponent, PlayerToSportDetailsCommonCudComponent, TeamCudComponent]
})
export class ProfileModule {
}
