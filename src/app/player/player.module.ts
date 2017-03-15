import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import {PlayerDetailComponent} from "./player-detail/player-detail.component";
import {PlayerDetailTeamSportComponent} from "./player-detail-team-sport/player-detail-team-sport.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    PlayerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
      PlayerDetailComponent,
      PlayerDetailTeamSportComponent,
  ]
})
export class PlayerModule { }
