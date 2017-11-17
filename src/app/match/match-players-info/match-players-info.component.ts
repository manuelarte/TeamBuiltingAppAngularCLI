import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RegisteredTeamInfo, TeamInfo} from '../teamInfo';
import {TeamService} from '../../services/team.service';
import {PlayerInfo, RegisteredPlayerInfo} from '../playerInfo';
import {PlayerToTeam} from '../../player-to-team';
import {Player} from "../../player";
import {UUID} from 'angular2-uuid';
import {Observable} from 'rxjs/Observable';
import {MatchFeedback} from '../../match-feedback/match-feedback';
import {PlayerInfoUtilService} from '../../player-info-util.service';
import {TeamInfoUtilService} from '../../team-info-util.service';

@Component({
  selector: 'app-match-players-info',
  templateUrl: './match-players-info.component.html',
  styleUrls: ['./match-players-info.component.scss'],
  providers: [TeamService, PlayerInfoUtilService, TeamInfoUtilService]
})
export class MatchPlayersInfoComponent implements OnInit {

  @Input() matchDate: Date = new Date();

  @Input() playersInfo: PlayerInfo[] = [];
  @Input() teamSelected$: Observable<TeamInfo>;
  @Input() teamRemoved$: Observable<any>;
  @Input() private editable = true;
  @Input() allUsersMatchFeedback: MatchFeedback[] = [];

  isBusy = false;
  errorOccurred = false;

  @Output() playersSelected: EventEmitter<PlayerInfo[]> = new EventEmitter<PlayerInfo[]>();

  constructor(private teamService: TeamService, private playerInfoUtilsService: PlayerInfoUtilService,
              private teamInfoUtilService: TeamInfoUtilService) { }

  ngOnInit() {
    this.matchDate = new Date(this.matchDate);
    if (this.teamSelected$) {
      this.teamSelected$.subscribe(teamInfo => {
          this.teamInfoSelectedEventHandler(teamInfo);
      });
    }
    if (this.teamRemoved$) {
      this.teamRemoved$.subscribe(() => this.teamInfoRemovedEventHandler())
    }

  }

  isEditable(): boolean {
    return this.editable;
  }

  private teamInfoSelectedEventHandler(teamInfo: TeamInfo): void {
    if (this.isRegisteredTeamInfo(teamInfo)) {
      // get the active players for that team
      const registeredTeamInfo: RegisteredTeamInfo = <RegisteredTeamInfo> teamInfo;
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
    } else {
      this.playersInfo = [];
      this.playersSelected.emit(this.playersInfo);
    }
  }

  private teamInfoRemovedEventHandler(): void {
    this.playersInfo = [];
  }

  newPlayerInfoEventHandler(playerInfo: PlayerInfo): void {
    this.playersInfo.push(playerInfo);
    this.playersSelected.emit(this.playersInfo);
  }

  removePlayerFromMatch(playerInfo: PlayerInfo) {
    this.playersInfo = this.playersInfo.filter(pI => pI !== playerInfo);
    this.playersSelected.emit(this.playersInfo);
  }

  getPlayersFilter(): (player: Player) => boolean {
      const notAllowedIds: number[] = this.playersInfo ? this.playersInfo.filter(this.playerInfoUtilsService.isRegisteredPlayer)
          .map(playerInfo => (<RegisteredPlayerInfo> playerInfo).playerId) : [];
      return (player) => notAllowedIds.indexOf(player.id) < 0 ;
  }

  private isRegisteredTeamInfo(teamInfo: TeamInfo): boolean {
    return this.teamInfoUtilService.isRegisteredTeam(teamInfo);
  }

  private convertToPlayerInfo(playerToTeam: PlayerToTeam): PlayerInfo {
      const playerInfo: RegisteredPlayerInfo = new RegisteredPlayerInfo();
      playerInfo.id = UUID.UUID();
      playerInfo.playerId = playerToTeam.playerId;
      return playerInfo;
  }

}
