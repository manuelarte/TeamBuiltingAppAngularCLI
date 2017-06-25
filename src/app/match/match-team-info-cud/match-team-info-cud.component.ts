import { Component, OnInit } from '@angular/core';
import {TeamSearchComponent} from '../../profile/team-search/team-search.component';
import {RegisteredTeamInfo, TeamInfo} from '../teamInfo';
import {Team} from '../../team';

@Component({
  selector: 'app-match-team-info-cud',
  templateUrl: './match-team-info-cud.component.html',
  styleUrls: ['./match-team-info-cud.component.scss'],
  providers: [TeamSearchComponent]
})
export class MatchTeamInfoCudComponent implements OnInit {

  teamRegistered = true;
  registeredTeamSelected: Team;
  teamInfo: TeamInfo;

  constructor() { }

  ngOnInit() {
  }

  setTeamInfoFromTeam(team: Team): void {
    const registeredTeamInfo: RegisteredTeamInfo = new RegisteredTeamInfo();
    registeredTeamInfo.teamId = team.id;

    this.teamInfo = registeredTeamInfo;
    this.registeredTeamSelected = team;
  }

}
