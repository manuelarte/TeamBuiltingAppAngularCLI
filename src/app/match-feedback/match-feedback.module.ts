import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TeamModule} from '../team/team.module';
import {RatingModule} from 'primeng/components/rating/rating';
import {CommonModule} from '@angular/common';
import {PlayerModule} from '../player/player.module';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatIconModule, MatInputModule, MatNativeDateModule,
    MatOptionModule,
    MatProgressSpinnerModule, MatSelectModule,
    MatSliderModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatTooltipModule
} from '@angular/material';

import {ProfileModule} from '../profile/profile.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TeambuiltingSharedModule} from '../shared/shared.module';
import { SchemaFormModule, WidgetRegistry } from 'angular2-schema-form';
import {MyWidgetRegistry} from '../shared/my-widget-registry';
import {CalendarModule, DataTableModule, MessagesModule, OverlayPanelModule, SharedModule} from 'primeng/primeng';
import {CdkTableModule} from '@angular/cdk/table';
import {MatchUtilsService} from '../services/match-utils.service';
import {MatchShowPlayerRatingComponent} from './match-show-player-rating/match-show-player-rating.component';
import {MatchFeedbackFormComponent} from './match-feedback-form/match-feedback-form.component';
import {MatchFeedbackItemInfoRatingComponent} from './match-feedback-item-info-rating/match-feedback-item-info-rating.component';
import {MatchFeedbackRewardsComponent} from './match-feedback-rewards/match-feedback-rewards.component';
import {TeamService} from '../services/team.service';
import {PlayerService} from '../services/player.service';
import {MatchService} from '../services/match.service';
import {MatchFeedbackRewardsDisplayComponent} from './match-feedback-rewards-display/match-feedback-rewards-display.component';
import {MatchFeedbackUtilsService} from '../services/match-feedback-utils.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [
        FlexLayoutModule,
        HttpClientModule,
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
        RatingModule,
        SharedModule,
        // Material Modules
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatSliderModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatTooltipModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        MatchFeedbackFormComponent,
        MatchFeedbackItemInfoRatingComponent,
        MatchFeedbackRewardsComponent,
        MatchFeedbackRewardsDisplayComponent,
        MatchShowPlayerRatingComponent,
    ],
    providers: [
        MatchService,
        MatchUtilsService,
        MatchFeedbackUtilsService,
        TeamService,
        PlayerService,
        {provide: LOCALE_ID, useValue: 'en'},
        {provide: WidgetRegistry, useClass: MyWidgetRegistry}
    ],
    exports: [MatchFeedbackFormComponent, MatchFeedbackRewardsDisplayComponent, MatchShowPlayerRatingComponent]
})
export class MatchFeedbackModule {
}
