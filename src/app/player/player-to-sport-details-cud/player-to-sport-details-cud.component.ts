import { Component, OnInit } from '@angular/core';
import {TeamSport, TeamSportPosition} from "../../team-sports";
import {TeamSportService} from "../../services/sports-service";

@Component({
  selector: 'app-player-to-sport-details-cud',
  templateUrl: './player-to-sport-details-cud.component.html',
  styleUrls: ['./player-to-sport-details-cud.component.scss'],
  providers: [TeamSportService]
})
export class PlayerToSportDetailsCudComponent implements OnInit {

  sports: TeamSport[];
  isBusyLoadingSports: boolean = true;

  constructor(private teamSportService: TeamSportService) { }

  ngOnInit() {
      this.teamSportService.getTeamSportsAvailable().then(sports => {
          this.isBusyLoadingSports = false;
          this.sports = sports;
      }).catch(error => {
          this.isBusyLoadingSports = false;
      })
  }

  isErrorLoadingSports(): boolean {
      return this.isBusyLoadingSports == false && this.sports == null;
  }

}
