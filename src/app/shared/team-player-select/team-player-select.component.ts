import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatchUtilsService} from '../../services/match-utils.service';
import {PlayerInfo} from '../../match/playerInfo';
import {TeamInfoUtilService} from '../../team-info-util.service';
import {PlayerInfoUtilService} from '../../player-info-util.service';

@Component({
  selector: 'app-team-player-select',
  templateUrl: './team-player-select.component.html',
  styleUrls: ['./team-player-select.component.scss'],
  providers: [MatchUtilsService, TeamInfoUtilService, PlayerInfoUtilService]
})
export class TeamPlayerSelectComponent implements OnInit {

  @Input() match;
  @Input() value: string;
  loadingPlayerRepresentation = true;
  playersRepresentation: PlayerRepresentation[] = [];
  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  constructor(private matchUtilsService: MatchUtilsService, private teamInfoUtilService: TeamInfoUtilService,
              private playerInfoUtilService: PlayerInfoUtilService) { }

  ngOnInit() {
      if (this.playersAreSelected()) {

          this.teamInfoUtilService.getDisplayableTeamInfo(this.match.homeTeam.teamInfo).subscribe(displayableHomeTeamInfo => {
              this.matchUtilsService.getHomePlayers(this.match).forEach(homePlayer =>
                  this.convertPlayerInfoToRepresentationAndPushInArray(displayableHomeTeamInfo.picture, homePlayer))
          });

          this.teamInfoUtilService.getDisplayableTeamInfo(this.match.awayTeam.teamInfo).subscribe(displayableAwayTeamInfo => {
              this.matchUtilsService.getAwayPlayers(this.match).forEach(awayPlayer =>
                  this.convertPlayerInfoToRepresentationAndPushInArray(displayableAwayTeamInfo.picture, awayPlayer))
          });
      }
  }

  private playersAreSelected(): boolean {
    return this.matchUtilsService.areHomePlayersSelected(this.match)
        && this.matchUtilsService.areAwayPlayersSelected(this.match);
  }

  public getPlayersRepresentation(): PlayerRepresentation[] {
    return this.playersRepresentation;
  }

  private convertPlayerInfoToRepresentationAndPushInArray(teamEmblem: string, playerInfo: PlayerInfo): void {
      this.playerInfoUtilService.getDisplayablePlayerInfo(playerInfo).subscribe(displayablePlayerInfo => {
          const representation = new PlayerRepresentation();
          representation.id = playerInfo.id;
          representation.teamEmblem = teamEmblem;
          representation.name = displayablePlayerInfo.name;
          representation.playerImage = displayablePlayerInfo.picture;
          this.playersRepresentation.push(representation);
          this.loadingPlayerRepresentation = false;
      });
  }

}

class PlayerRepresentation {
    id: string;
    teamEmblem: string;
    playerImage: string;
    name: string;
}
