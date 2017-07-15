import {Component, OnInit, Input} from '@angular/core';
import {RegisteredTeamInfo, TeamInfo, UnRegisteredTeamInfo} from '../teamInfo';
import {Team} from '../../team';
import {UtilsService} from '../../services/utils.service';
import {TeamService} from '../../services/team.service';

@Component({
  selector: 'app-match-team-info',
  templateUrl: './match-team-info.component.html',
  styleUrls: ['./match-team-info.component.scss'],
  providers: [UtilsService, TeamService]
})
export class MatchTeamInfoComponent implements OnInit {

  @Input() teamInfo: TeamInfo;

  isBusy = false;
  errorLoading = false;
  /**
   * This is the holder to show it in the screen
  */
  team: DisplayableTeamInfo;

  constructor(private teamService: TeamService, private utilsService: UtilsService) { }

  ngOnInit() {
    if (this.utilsService.isRegisteredTeam(this.teamInfo)) {
      const registeredTeamInfo: RegisteredTeamInfo = <RegisteredTeamInfo> this.teamInfo;
      this.isBusy = true;
      this.errorLoading = false;
      this.teamService.getTeam(registeredTeamInfo.teamId).then(team => {
        this.isBusy = false;
        this.errorLoading = false;
        this.team = this.setTeamInfoFromTeam(team);
      }).catch(error => {
        this.isBusy = false;
        this.errorLoading = false;
      });
    } else {
      this.team = this.setTeamFromUnRegisteredTeamInfo();
    }
  }

  private setTeamInfoFromTeam(team: Team): DisplayableTeamInfo {
    const displayableTeam = new DisplayableTeamInfo();
    displayableTeam.name = team.name;
    displayableTeam.teamEmblem = team.emblemLink;
    return displayableTeam;
  }

  private setTeamFromUnRegisteredTeamInfo(): DisplayableTeamInfo {
      const unregisteredTeamInfo: UnRegisteredTeamInfo = <UnRegisteredTeamInfo> this.teamInfo;

      const displayableTeam = new DisplayableTeamInfo();
      displayableTeam.name = unregisteredTeamInfo.name;
      displayableTeam.teamEmblem = "./images/question-mark.jpg";
      return displayableTeam;
  }

}

export class DisplayableTeamInfo {
    name: string;
    teamEmblem: string;
}
