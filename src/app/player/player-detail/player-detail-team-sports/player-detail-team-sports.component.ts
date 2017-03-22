import {Component, OnInit, Input}      from '@angular/core';
import {TeamService} from "../../../services/team.service";
import {PlayerService} from "../../../services/player.service";
import {Player} from "../../../player";
import {PlayerToTeamSportDetails} from "../../../player-to-team-sport-details";


@Component({
  selector: 'player-detail-team-sports',
  templateUrl: 'player-detail-team-sports.component.html',
  styleUrls: ['player-detail-team-sports.component.scss'],
  providers: [PlayerService, TeamService]
})
export class PlayerDetailTeamSportsComponent implements OnInit {
  @Input() player: Player;
  @Input() playerToTeamSport: {[sport: string]: PlayerToTeamSportDetails};

  constructor(
  ) {}

  ngOnInit(): void {

  }

  getSportsPlayed(): string[] {
      return Object.keys(this.playerToTeamSport);
  }

}
