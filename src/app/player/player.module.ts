import {NgModule, LOCALE_ID} from '@angular/core';
import { ClarityModule } from 'clarity-angular';


import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AgmCoreModule} from "angular2-google-maps/core";

import {InputTextModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';

import {GrowlModule} from "primeng/primeng";
import {DataListModule} from 'primeng/primeng';

import {CalendarModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';
import {ChartsModule} from "ng2-charts";
import {MultiSelectModule} from 'primeng/primeng';
import {PlayerFootballPositionComponent} from "./player-position/player-football-position.component";
import {PlayerFutsalPositionComponent} from "./player-position/player-futsal-position.component";
import {PlayerDetailComponent} from "./player-detail/player-detail.component";
import {PlayerInTeamComponent} from "./player-in-team/player-in-team.component";
import {PlayerCommentsComponent} from "./player-detail/player-comments/player-comments.component";
import {PlayerDetailStatisticsComponent} from "./player-detail/player-detail-statistics/player-detail-statistics.component";
import {PlayerRewardsComponent} from "./player-detail/player-rewards/player-rewards.component";
import {GiveRewardComponent} from "./give-reward/give-reward.component";
import {PlayerPositionIconComponent} from "./player-position/player-position-icon/player-position-icon.component";
import {PlayerDetailTeamSportsComponent} from "./player-detail/player-detail-team-sports/player-detail-team-sports.component";
import {ShowPlayerCommentComponent} from "./player-detail/player-comments/show-player-comment/show-player-comment.component";
import {PlayerCommentFormComponent} from "./player-detail/player-comments/player-comment-form/player-comment-form.component";
import {ShowPlayerRewardComponent} from "./player-detail/player-rewards/show-player-reward/show-player-reward.component";
import {PlayerCudComponent} from "./player-cud/player-cud.component";
import {CommonModule} from "@angular/common";
import {PlayerRoutingModule} from "./player-routing.module";
import {PlayerSearchComponent} from "./player-search/player-search.component";


@NgModule({
  imports: [
    PlayerRoutingModule,
    CommonModule,
    ChartModule,
    ChartsModule,
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
  ],
  declarations: [
      PlayerDetailComponent,
      PlayerCommentsComponent,
      PlayerCudComponent,
      PlayerDetailStatisticsComponent,
      PlayerDetailTeamSportsComponent,
      PlayerCommentFormComponent,
      PlayerRewardsComponent,
      PlayerFootballPositionComponent,
      PlayerFutsalPositionComponent,
      PlayerPositionIconComponent,
      PlayerInTeamComponent,
      PlayerSearchComponent,

      GiveRewardComponent,
      ShowPlayerCommentComponent,
      ShowPlayerRewardComponent,
  ],
  providers: [
      { provide: LOCALE_ID, useValue: "nl" },
  ],
    exports: [PlayerSearchComponent, PlayerInTeamComponent, PlayerDetailComponent, PlayerCudComponent ]
})
export class PlayerModule {
}
