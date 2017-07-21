import {Component, OnInit, Input} from '@angular/core';
import {DisplayableTeamInfo, TeamInfo} from '../teamInfo';
import {TeamInfoUtilService} from '../../team-info-util.service';

@Component({
  selector: 'app-match-team-info',
  templateUrl: './match-team-info.component.html',
  styleUrls: ['./match-team-info.component.scss'],
  providers: []
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
