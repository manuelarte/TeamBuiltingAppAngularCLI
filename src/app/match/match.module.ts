import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {TeamModule} from '../team/team.module';
import {RatingModule} from 'primeng/components/rating/rating';
import {CommonModule} from '@angular/common';
import {PlayerModule} from '../player/player.module';
import {
    MdButtonModule, MdCardModule, MdCheckboxModule, MdDatepickerModule, MdIconModule, MdInputModule, MdNativeDateModule,
    MdOptionModule,
    MdProgressSpinnerModule, MdSelectModule,
    MdSliderModule
} from '@angular/material';

import {ProfileModule} from '../profile/profile.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatchCudComponent} from './match-cud/match-cud.component';
import {MatchRoutingModule} from './match-routing.module';
import {MatchTeamInfoCudComponent} from './match-team-info-cud/match-team-info-cud.component';
import {MatchPlayersInfoComponent} from './match-players-info/match-players-info.component';
import {MatchPlayerInfoComponent} from './match-player-info/match-player-info.component';
import {MatchPlayerInfoCudComponent} from './match-player-info-cud/match-player-info-cud.component';
import {MatchTimelineComponent} from './match-timeline/match-timeline.component';
import {TeambuiltingSharedModule} from '../shared/shared.module';
import {MatchTimelineEventsComponent} from './match-timeline-events/match-timeline-events.component';
import { SchemaFormModule, WidgetRegistry } from 'angular2-schema-form';
import {MyWidgetRegistry} from '../shared/my-widget-registry';
import {MatchPartsComponent} from './match-parts/match-parts.component';
import {CalendarModule, SharedModule} from 'primeng/primeng';

@NgModule({
    imports: [
        MatchRoutingModule,
        FlexLayoutModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RatingModule,
        TeamModule,
        PlayerModule,
        ProfileModule,
        TeambuiltingSharedModule,
        SchemaFormModule,
        // PrimeNg
        CalendarModule,
        SharedModule,
        // Material Modules
        MdButtonModule,
        MdCardModule,
        MdCheckboxModule,
        MdDatepickerModule,
        MdNativeDateModule,
        MdIconModule,
        MdInputModule,
        MdOptionModule,
        MdSelectModule,
        MdSliderModule,
        MdProgressSpinnerModule
    ],
    declarations: [
        MatchCudComponent,
        MatchTeamInfoCudComponent,
        MatchPlayersInfoComponent,
        MatchPlayerInfoComponent,
        MatchPlayerInfoCudComponent,
        MatchTimelineComponent,
        MatchTimelineEventsComponent,
        MatchPartsComponent,
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'nl'},
        {provide: WidgetRegistry, useClass: MyWidgetRegistry}
    ],
    exports: []
})
export class MatchModule {
}
