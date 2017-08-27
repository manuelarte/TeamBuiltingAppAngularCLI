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
    MdSliderModule, MdSnackBarModule, MdTableModule, MdTabsModule, MdTooltipModule
} from '@angular/material';

import {ProfileModule} from '../profile/profile.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TeambuiltingSharedModule} from '../shared/shared.module';
import { SchemaFormModule, WidgetRegistry } from 'angular2-schema-form';
import {MyWidgetRegistry} from '../shared/my-widget-registry';
import {CalendarModule, DataTableModule, MessagesModule, OverlayPanelModule, SharedModule} from 'primeng/primeng';
import {CdkTableModule} from '@angular/cdk';
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

@NgModule({
    imports: [
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
        RatingModule,
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
        MdSnackBarModule,
        MdTableModule,
        MdTabsModule,
        MdTooltipModule,
        MdProgressSpinnerModule
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
        {provide: LOCALE_ID, useValue: 'nl'},
        {provide: WidgetRegistry, useClass: MyWidgetRegistry}
    ],
    exports: [MatchFeedbackFormComponent, MatchFeedbackRewardsDisplayComponent, MatchShowPlayerRatingComponent]
})
export class MatchFeedbackModule {
}
