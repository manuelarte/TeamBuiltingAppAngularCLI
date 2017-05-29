import {NgModule, LOCALE_ID} from '@angular/core';

import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AgmCoreModule} from '@agm/core';

import {ChartModule, MessagesModule} from 'primeng/primeng';
import {ChartsModule} from 'ng2-charts';
import {PlayerDetailComponent} from './player-detail/player-detail.component';
import {PlayerInTeamComponent} from './player-in-team/player-in-team.component';
import {PlayerCommentsComponent} from './player-detail/player-comments/player-comments.component';
import {PlayerDetailStatisticsComponent} from './player-detail/player-detail-statistics/player-detail-statistics.component';
import {PlayerRewardsComponent} from './player-detail/player-rewards/player-rewards.component';
import {GiveRewardComponent} from './give-reward/give-reward.component';
import {PlayerDetailTeamSportsComponent} from './player-detail/player-detail-team-sports/player-detail-team-sports.component';
import {ShowPlayerCommentComponent} from './player-detail/player-comments/show-player-comment/show-player-comment.component';
import {PlayerCommentFormComponent} from './player-detail/player-comments/player-comment-form/player-comment-form.component';
import {ShowPlayerRewardComponent} from './player-detail/player-rewards/show-player-reward/show-player-reward.component';
import {CommonModule} from '@angular/common';
import {PlayerRoutingModule} from './player-routing.module';
import {PlayerDetailIntroComponent} from './player-detail-intro/player-detail-intro.component';
import {PlayerToTeamCardComponent} from './player-to-team-card/player-to-team-card.component';
import {
    MdButtonModule, MdCardModule, MdCheckboxModule, MdDialogModule, MdGridListModule, MdIconModule,
    MdInputModule, MdMenuModule, MdOptionModule, MdProgressSpinnerModule, MdSelectModule, MdSnackBarModule
} from '@angular/material';
import {SportModule} from '../sport/sport.module';
import {ProfileModule} from '../profile/profile.module';
import {PlayerCudCardComponent} from './player-cud-card/player-cud-card.component';
import {UserRightsService} from '../services/user-rights.service';
import {GoogleChart} from '../directives/angular2-google-chart.directive';
import { Parallax } from 'ng2-parallax/commonjs';

@NgModule({
  imports: [
    PlayerRoutingModule,
    CommonModule,
    ChartModule,
    ChartsModule,
    MessagesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule,
    // Material Modules
    MdCardModule,
    MdButtonModule,
    MdInputModule,
    MdIconModule,
    MdGridListModule,
    MdCheckboxModule,
    MdSnackBarModule,
    MdProgressSpinnerModule,
    MdSelectModule,
    MdMenuModule,
    MdOptionModule,
    MdDialogModule,
    // Other modules
    SportModule,
    ProfileModule,
  ],
  declarations: [
      PlayerDetailComponent,
      PlayerDetailIntroComponent,
      PlayerCommentsComponent,
      PlayerCudCardComponent,
      PlayerToTeamCardComponent,
      PlayerDetailStatisticsComponent,
      PlayerDetailTeamSportsComponent,
      PlayerCommentFormComponent,
      PlayerRewardsComponent,
      PlayerInTeamComponent,
      GiveRewardComponent,
      ShowPlayerCommentComponent,
      ShowPlayerRewardComponent,
      GoogleChart,
      Parallax,
  ],
  providers: [ UserRightsService,
      { provide: LOCALE_ID, useValue: 'nl' },
  ],
    entryComponents: [GiveRewardComponent],
    exports: [PlayerInTeamComponent, PlayerDetailComponent, PlayerCudCardComponent, PlayerToTeamCardComponent ]
})
export class PlayerModule {
}
