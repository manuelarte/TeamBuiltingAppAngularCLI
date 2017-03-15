import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import {TeamDetailComponent} from "./team-detail/team-detail.component";

@NgModule({
  imports: [
    CommonModule,
    TeamRoutingModule
  ],
  declarations: [TeamDetailComponent]
})
export class TeamModule { }
