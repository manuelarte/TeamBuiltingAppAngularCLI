import { Injectable } from '@angular/core';
import {UtilsService} from './services/utils.service';
import {DisplayableTeamInfo, RegisteredTeamInfo, TeamInfo, UnRegisteredTeamInfo} from './match/teamInfo';
import {Observable} from 'rxjs/Observable';
import {TeamService} from './services/team.service';
import {Team} from './team';

@Injectable()
export class TeamInfoUtilService {

  constructor(private teamService: TeamService, private utilsService: UtilsService) { }

  getDisplayableTeamInfo(teamInfo: TeamInfo): Observable<DisplayableTeamInfo> {
      if (this.utilsService.isRegisteredTeam(teamInfo)) {
          const registeredTeamInfo: RegisteredTeamInfo = <RegisteredTeamInfo> teamInfo;
          return this.teamService.getTeam$(registeredTeamInfo.teamId).map(team => this.convertToDisplayableTeamInfo(team));
      } else {
          const unregisteredTeamInfo: UnRegisteredTeamInfo = <UnRegisteredTeamInfo> teamInfo;
          const displayableTeam: DisplayableTeamInfo = new DisplayableTeamInfo();
          displayableTeam.name = unregisteredTeamInfo.name;
          displayableTeam.picture = unregisteredTeamInfo.picture ? unregisteredTeamInfo.picture :
              "./images/question-mark.jpg";
          return Observable.of(displayableTeam);
      }
  }

  private convertToDisplayableTeamInfo(team: Team): DisplayableTeamInfo {
    const displayableTeam = new DisplayableTeamInfo();
    displayableTeam.name = team.name;
    displayableTeam.picture = team.emblemLink;
    return displayableTeam;
  }

}
