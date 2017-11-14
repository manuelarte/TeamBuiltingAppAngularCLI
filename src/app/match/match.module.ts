import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TeamModule} from '../team/team.module';
import {CommonModule} from '@angular/common';
import {PlayerModule} from '../player/player.module';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatIconModule, MatInputModule,
    MatNativeDateModule,
    MatOptionModule,
    MatProgressSpinnerModule, MatSelectModule,
    MatSliderModule, MatTableModule, MatTabsModule, MatTooltipModule
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
import {CdkTableModule} from '@angular/cdk/table';
import {MatchEventsShowComponent} from './match-events-show/match-events-show.component';
import {MatchUtilsService} from '../services/match-utils.service';
import {MatchTeamInfoComponent} from "./match-team-info/match-team-info.component";
import {MatchDetailComponent} from './match-detail/match-detail.component';
import {MatchFeedbackModule} from '../match-feedback/match-feedback.module';
import {MatchTagsComponent} from './match-tags/match-tags.component';
import {PlayerInfoUtilService} from '../player-info-util.service';
import {TeamInfoUtilService} from '../team-info-util.service';
import {PlayerService} from '../services/player.service';
import {TeamService} from '../services/team.service';
import {UtilsService} from '../services/utils.service';
import {MatchService} from '../services/match.service';
import {TeamSearchService} from '../services/team-search.service';
import {CanActivateViaAuthGuard} from '../shared/can-activate-via-auth-guard';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [
        HttpClientModule,
        MatchRoutingModule,
        FlexLayoutModule,
        CdkTableModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatSliderModule,
        MatTableModule,
        MatTabsModule,
        MatTooltipModule,
        MatProgressSpinnerModule
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
        MatchTagsComponent,
        MatchTimelineComponent,
        MatchPartsComponent,
    ],
    providers: [
        MatchService,
        MatchUtilsService,
        PlayerInfoUtilService,
        PlayerService,
        TeamInfoUtilService,
        TeamService,
        TeamSearchService,
        UtilsService,
        CanActivateViaAuthGuard,
        {provide: LOCALE_ID, useValue: 'en'},
        {provide: WidgetRegistry, useClass: MyWidgetRegistry}
    ],
    exports: []
})
export class MatchModule {
}
