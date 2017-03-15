import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import {TeamDetailComponent} from "./team-detail/team-detail.component";
import {TeamInGoogleMapsComponent} from "./team-in-google-maps/team-in-google-maps.component";
import {TeamDetailSportIntroComponent} from "./team-detail-sport-intro/team-detail-sport-intro.component";
import {AgmCoreModule} from "angular2-google-maps/core";
import {TeamSearchComponent} from "./team-search/team-search.component";

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAnvqOUmUsKviVfAP6TDv6eTj6nAzaCmw4'
    }),
    CommonModule,
    TeamRoutingModule,
  ],
  declarations: [
      TeamDetailComponent,
      TeamDetailSportIntroComponent,
      TeamInGoogleMapsComponent,
      TeamSearchComponent,
  ],
  exports: [TeamSearchComponent]
})
export class TeamModule { }
