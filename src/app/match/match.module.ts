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
    MdSliderModule, MdTableModule, MdTabsModule, MdTooltipModule
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
import {MatchEventsComponent} from './match-events/match-events.component';
import { SchemaFormModule, WidgetRegistry } from 'angular2-schema-form';
import {MyWidgetRegistry} from '../shared/my-widget-registry';
import {MatchPartsComponent} from './match-parts/match-parts.component';
import {CalendarModule, DataTableModule, MessagesModule, OverlayPanelModule, SharedModule} from 'primeng/primeng';
import {CdkTableModule} from '@angular/cdk';
import {MatchEventsShowComponent} from './match-events-show/match-events-show.component';
import {MatchUtilsService} from '../services/match-utils.service';
import {MatchTeamInfoComponent} from "./match-team-info/match-team-info.component";
import {MatchDetailComponent} from './match-detail/match-detail.component';
import {MatchFeedbackModule} from '../match-feedback/match-feedback.module';

@NgModule({
    imports: [
        MatchRoutingModule,
        FlexLayoutModule,
        CdkTableModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MessagesModule,
        TeamModule,
        PlayerModule,
        ProfileModule,
        TeambuiltingSharedModule,
        SchemaFormModule,
        OverlayPanelModule,
        // PrimeNg
        CalendarModule,
        DataTableModule,
        MatchFeedbackModule,
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
        MdTableModule,
        MdTabsModule,
        MdTooltipModule,
        MdProgressSpinnerModule
    ],
    declarations: [
        MatchCudComponent,
        MatchDetailComponent,
        MatchEventsComponent,
        MatchEventsShowComponent,
        MatchTeamInfoComponent,
        MatchTeamInfoCudComponent,
        MatchPlayersInfoComponent,
        MatchPlayerInfoComponent,
        MatchPlayerInfoCudComponent,
        MatchTimelineComponent,
        MatchPartsComponent,
    ],
    providers: [
        MatchUtilsService,
        {provide: LOCALE_ID, useValue: 'nl'},
        {provide: WidgetRegistry, useClass: MyWidgetRegistry}
    ],
    exports: []
})
export class MatchModule {
}
