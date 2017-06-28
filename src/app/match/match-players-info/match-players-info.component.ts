import {Component, Input, OnInit} from '@angular/core';
import {RegisteredTeamInfo, TeamInfo} from '../teamInfo';
import {UtilsService} from '../../services/utils.service';
import {TeamService} from '../../services/team.service';
import {PlayerInfo, RegisteredPlayerInfo, UnRegisteredPlayerInfo} from '../playerInfo';
import {PlayerToTeam} from '../../player-to-team';

@Component({
  selector: 'app-match-players-info',
  templateUrl: './match-players-info.component.html',
  styleUrls: ['./match-players-info.component.scss'],
  providers: [TeamService, UtilsService]
})
export class MatchPlayersInfoComponent implements OnInit {

  @Input() matchDate: Date = new Date();
  @Input() teamInfo: TeamInfo;
  registeredTeamInfo = false;
  playersInfo: PlayerInfo[];

  isBusy = false;
  errorOccurred = false;

  constructor(private teamService: TeamService, private utils: UtilsService) { }

  ngOnInit() {
    this.matchDate = new Date(this.matchDate);
    this.registeredTeamInfo = this.teamInfo != null && this.utils.isRegisteredTeam(this.teamInfo);
    if (this.registeredTeamInfo) {
        // get the active players for that team
        const registeredTeamInfo: RegisteredTeamInfo = <RegisteredTeamInfo> this.teamInfo;
        this.isBusy = true;
        this.errorOccurred = false;
        this.teamService.getPlayers(registeredTeamInfo.teamId, this.matchDate).then(playersToTeam => {
          this.playersInfo = playersToTeam.map(this.convertToPlayerInfo);
          this.isBusy = false;
          this.errorOccurred = false;
        }).catch(error => {
          this.isBusy = false;
          this.errorOccurred = true;
        });
    }
  }

  private convertToPlayerInfo(playerToTeam: PlayerToTeam): PlayerInfo {
      const playerInfo: RegisteredPlayerInfo = new RegisteredPlayerInfo();
      playerInfo.playerId = playerToTeam.playerId;
      return playerInfo;
  }

}
