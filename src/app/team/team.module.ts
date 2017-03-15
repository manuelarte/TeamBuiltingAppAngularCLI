import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import {TeamDetailComponent} from "./team-detail/team-detail.component";
import {TeamInGoogleMapsComponent} from "./team-in-google-maps/team-in-google-maps.component";

@NgModule({
  imports: [
    CommonModule,
    TeamRoutingModule,
    TeamInGoogleMapsComponent
  ],
  declarations: [TeamDetailComponent]
})
export class TeamModule { }
