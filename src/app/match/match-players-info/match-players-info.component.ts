import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RegisteredTeamInfo, TeamInfo} from '../teamInfo';
import {UtilsService} from '../../services/utils.service';
import {TeamService} from '../../services/team.service';
import {PlayerInfo, RegisteredPlayerInfo, UnRegisteredPlayerInfo} from '../playerInfo';
import {PlayerToTeam} from '../../player-to-team';
import {Player} from "../../player";

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

  @Output() playersSelected: EventEmitter<PlayerInfo[]> = new EventEmitter<PlayerInfo[]>();

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
          this.playersSelected.emit(this.playersInfo);
        }).catch(error => {
          this.isBusy = false;
          this.errorOccurred = true;
        });
    }
  }

  addPlayerInfo(playerInfo: PlayerInfo): void {
      this.playersInfo.push(playerInfo);
      this.playersSelected.emit(this.playersInfo);
  }

  removePlayerFromMatch(playerInfo: PlayerInfo) {
      this.playersInfo = this.playersInfo.filter(pI => pI !== playerInfo);
  }

  getPlayersFilter(): (player: Player) => boolean {
      const notAllowedIds: number[] = this.playersInfo ? this.playersInfo.filter(this.utils.isRegisteredPlayer)
          .map(playerInfo => (<RegisteredPlayerInfo> playerInfo).playerId) : [];
      return (player) => notAllowedIds.indexOf(player.id) < 0 ;
  }

  private convertToPlayerInfo(playerToTeam: PlayerToTeam): PlayerInfo {
      const playerInfo: RegisteredPlayerInfo = new RegisteredPlayerInfo();
      playerInfo.playerId = playerToTeam.playerId;
      return playerInfo;
  }

}
