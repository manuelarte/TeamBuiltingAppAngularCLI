import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TeamSearchComponent} from '../../profile/team-search/team-search.component';
import {RegisteredTeamInfo, TeamInfo} from '../teamInfo';
import {Team} from '../../team';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-match-team-info-cud',
  templateUrl: './match-team-info-cud.component.html',
  styleUrls: ['./match-team-info-cud.component.scss'],
  providers: [TeamSearchComponent, UtilsService]
})
export class MatchTeamInfoCudComponent implements OnInit {

  /**
   * To check if the team is already registered in TeamBuilting
   * @type {boolean}
  */
  teamRegistered = true;

  team: Team;
  teamInfo: TeamInfo;

  @Output() teamSelected: EventEmitter<TeamInfo> = new EventEmitter<TeamInfo>();
  @Output() teamRemoved: EventEmitter<void> = new EventEmitter<void>();

  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
  }

  setTeamInfoFromTeam(team: Team): void {
    const registeredTeamInfo: RegisteredTeamInfo = new RegisteredTeamInfo();
    registeredTeamInfo.id = this.utilsService.guidGenerator();
    registeredTeamInfo.teamId = team.id;

    this.teamInfo = registeredTeamInfo;
    this.team = team;

    this.teamSelected.emit(this.teamInfo);
  }

  removeTeam(): void {
    this.teamInfo = null;
    this.team = null;
    this.teamRemoved.emit();
  }

}
