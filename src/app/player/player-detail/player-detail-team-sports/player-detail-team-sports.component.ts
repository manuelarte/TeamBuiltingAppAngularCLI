import {Component, OnInit, Input} from '@angular/core';
import {PlayerToTeamSportDetails} from "../../../player-to-team-sport-details";
import {TeamSport} from "../../../team-sports";
import {TeamSportService} from "../../../services/sports-service";
import {Player} from '../../../player';


@Component({
  selector: 'player-detail-team-sports',
  templateUrl: 'player-detail-team-sports.component.html',
  styleUrls: ['player-detail-team-sports.component.scss'],
  providers: [TeamSportService]
})
export class PlayerDetailTeamSportsComponent implements OnInit {
  @Input() playerToTeamSport: {[sport: string]: PlayerToTeamSportDetails};
  /**
   * To represent the player in the field
   * @type {Player}
  */
  @Input() player: Player = new Player();
  sports: {[sportName: string]: TeamSport} = {};
  loadingSportsFlag = true;

  constructor(private teamSportService: TeamSportService) {}

  ngOnInit(): void {
      this.loadingSportsFlag = true;
      this.teamSportService.getTeamSportsAvailable().then(sports => {
          sports.forEach(sport => this.sports[sport.name] = sport);
          this.loadingSportsFlag = false;
      }).catch(error => {
          this.loadingSportsFlag = false;
      });
  }

  getSportsPlayed(): string[] {
      return Object.keys(this.playerToTeamSport);
  }

}
