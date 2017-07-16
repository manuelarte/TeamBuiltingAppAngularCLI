import {Component, Input, OnInit} from '@angular/core';
import {RegisteredTeamInfo, TeamInfo, UnRegisteredTeamInfo} from '../../match/teamInfo';
import {FormControl} from '@angular/forms';
import {Match} from '../../match/match';
import {UtilsService} from '../../services/utils.service';
import {TeamService} from '../../services/team.service';
import {Team} from '../../team';

@Component({
  selector: 'app-my-team-in-match-widget',
  templateUrl: './my-team-in-match-widget.component.html',
  styleUrls: ['./my-team-in-match-widget.component.scss'],
  providers: [TeamService, UtilsService]
})
export class MyTeamInMatchWidgetComponent implements OnInit {

  @Input() schema: {[key: string]: any, widget: {id: string, match: Match}};
  teamsRepresentation: TeamRepresentation[] = [];
  @Input() control: FormControl = new FormControl();
  @Input() name: string;

  @Input() value: string;

  isBusyLoadingHomeTeam = false;
  isBusyLoadingAwayTeam = false;
  isErrorLoading = false;

  constructor(private teamService: TeamService, private utilsService: UtilsService) { }

  ngOnInit() {
    if (this.teamsAreSelected()) {

          const homeTeamInfo: TeamInfo = this.schema.widget.match.homeTeam.teamInfo;
          const homeTeamRepresentation = new TeamRepresentation();
          homeTeamRepresentation.id = homeTeamInfo.id;
          if (this.utilsService.isRegisteredTeam(homeTeamInfo)) {
            const registeredTeamInfo: RegisteredTeamInfo = <RegisteredTeamInfo> homeTeamInfo;
            this.isBusyLoadingHomeTeam = true;
            this.teamService.getTeam(registeredTeamInfo.teamId).then(team => {
              this.isBusyLoadingHomeTeam = false;
              this.setFieldsUsingTeam(homeTeamRepresentation, team);
            })
          } else {
            const unregisteredTeamInfo: UnRegisteredTeamInfo = <UnRegisteredTeamInfo> homeTeamInfo;
            this.setFieldsUsingUnRegisteredTeam(homeTeamRepresentation, unregisteredTeamInfo);
          }


          const awayTeamInfo: TeamInfo = this.schema.widget.match.awayTeam.teamInfo;
          const awayTeamRepresentation = new TeamRepresentation();
          awayTeamRepresentation.id = awayTeamInfo.id;
          if (this.utilsService.isRegisteredTeam(awayTeamInfo)) {
            const registeredTeamInfo: RegisteredTeamInfo = <RegisteredTeamInfo> awayTeamInfo;
            this.isBusyLoadingAwayTeam = true;
            this.teamService.getTeam(registeredTeamInfo.teamId).then(team => {
              this.isBusyLoadingAwayTeam = false;
              this.setFieldsUsingTeam(awayTeamRepresentation, team);

            })
          } else {
            const unregisteredTeamInfo: UnRegisteredTeamInfo = <UnRegisteredTeamInfo> awayTeamInfo;
            this.setFieldsUsingUnRegisteredTeam(awayTeamRepresentation, unregisteredTeamInfo);
          }

          this.teamsRepresentation.push(homeTeamRepresentation, awayTeamRepresentation);
    }

  }

  private setFieldsUsingTeam(teamRepresentation: TeamRepresentation, team: Team): void {
      teamRepresentation.teamEmblem = team.emblemLink;
      teamRepresentation.name = team.name
  }

  private setFieldsUsingUnRegisteredTeam(teamRepresentation: TeamRepresentation, unregisteredTeamInfo: UnRegisteredTeamInfo): void {
      teamRepresentation.name = unregisteredTeamInfo.name;
  }

  isBusy(): boolean {
    return this.isBusyLoadingHomeTeam || this.isBusyLoadingAwayTeam;
  }

  private teamsAreSelected(): boolean {
    if (this.schema && this.schema.widget.match.homeTeam || this.schema.widget.match.awayTeam) {
        return true;
    }
    return false;
  }

  getTeamsRepresentation(): TeamRepresentation[] {
    return this.teamsRepresentation;
  }

}

class TeamRepresentation implements TeamInfo {
    id: string;
    teamEmblem: string;
    name: string;
}
