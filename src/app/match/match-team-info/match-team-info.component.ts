import {Component, OnInit, Input} from '@angular/core';
import {DisplayableTeamInfo, TeamInfo} from '../teamInfo';
import {UtilsService} from '../../services/utils.service';
import {TeamInfoUtilService} from '../../team-info-util.service';
import {TeamService} from '../../services/team.service';

@Component({
  selector: 'app-match-team-info',
  templateUrl: './match-team-info.component.html',
  styleUrls: ['./match-team-info.component.scss'],
  providers: [TeamInfoUtilService, TeamService, UtilsService]
})
export class MatchTeamInfoComponent implements OnInit {

  @Input() teamInfo: TeamInfo;

  isBusy = false;
  errorLoading = false;
  /**
   * This is the holder to show it in the screen
  */
  team: DisplayableTeamInfo;

  constructor(private teamInfoUtilsService: TeamInfoUtilService) { }

  ngOnInit() {
    this.teamInfoUtilsService.getDisplayableTeamInfo(this.teamInfo).subscribe(displayableTeamInfo => this.team = displayableTeamInfo)
  }

}
