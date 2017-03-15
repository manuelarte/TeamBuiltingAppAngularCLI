import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import {PlayerDetailComponent} from "./player-detail/player-detail.component";

@NgModule({
  imports: [
    CommonModule,
    PlayerRoutingModule
  ],
  declarations: [PlayerDetailComponent]
})
export class PlayerModule { }
