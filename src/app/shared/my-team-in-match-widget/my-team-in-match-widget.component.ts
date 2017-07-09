import {Component, Input, OnInit} from '@angular/core';
import {TeamInfo} from '../../match/teamInfo';
import {FormControl} from '@angular/forms';
import {Match} from '../../match/match';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-my-team-in-match-widget',
  templateUrl: './my-team-in-match-widget.component.html',
  styleUrls: ['./my-team-in-match-widget.component.scss'],
  providers: [UtilsService]
})
export class MyTeamInMatchWidgetComponent implements OnInit {

  @Input() schema: {[key: string]: any, widget: {id: string, match: Match}};
  teamsRepresentation: TeamRepresentation[] = [];
  @Input() control: FormControl = new FormControl();

  isBusy = false;
  isErrorLoading = false;

  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
      if (this.teamsAreSelected()) {
          const homeTeam: TeamInfo = this.schema.widget.match.homeTeam.teamInfo;
          const awayTeam: TeamInfo = this.schema.widget.match.awayTeam.teamInfo;
          this.teamsRepresentation.push(this.convertTeamInfoToRepresentation(homeTeam), this.convertTeamInfoToRepresentation(awayTeam));
      }
  }

  private teamsAreSelected(): boolean {
    if (this.schema.widget.match.homeTeam || this.schema.widget.match.awayTeam) {
        return true;
    }
    return false;
  }

  getTeamsRepresentation(): TeamRepresentation[] {
    return this.teamsRepresentation;
  }

  private convertTeamInfoToRepresentation(teamInfo: TeamInfo): TeamRepresentation {
      if (this.utilsService.isRegisteredTeam(teamInfo)) {

      }
      const representation = new TeamRepresentation();
      representation.id = teamInfo.id;
      representation.teamEmblem = 'http://www.devo58.nl/wordpress/wp-content/themes/devo-activello/images/devo58-logo@2x.png';
      representation.name = 'Devo58 Zaterdag 2';
      return representation;
  }

}

class TeamRepresentation implements TeamInfo {
    id: string;
    teamEmblem: string;
    name: string;
}
