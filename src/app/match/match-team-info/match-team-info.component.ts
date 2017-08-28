import {Component, OnInit, Input} from '@angular/core';
import {DisplayableTeamInfo, RegisteredTeamInfo, TeamInfo} from '../teamInfo';
import {TeamInfoUtilService} from '../../team-info-util.service';
import {RouterUtilsService} from '../../services/router-utils.service';

@Component({
  selector: 'app-match-team-info',
  templateUrl: './match-team-info.component.html',
  styleUrls: ['./match-team-info.component.scss'],
  providers: [RouterUtilsService]
})
export class MatchTeamInfoComponent implements OnInit {

  @Input() teamInfo: TeamInfo;

  private loadingTeamInfo = false;
  isImgLoaded = false;
  errorLoading = false;

  /**
   * This is the holder to show it in the screen
  */
  team: DisplayableTeamInfo;

  constructor(private teamInfoUtilsService: TeamInfoUtilService,
              private routerUtilsService: RouterUtilsService) { }

  ngOnInit() {
    this.loadingTeamInfo = true;
    this.teamInfoUtilsService.getDisplayableTeamInfo(this.teamInfo).subscribe(displayableTeamInfo => {
        this.team = displayableTeamInfo;
        this.loadingTeamInfo = false;
    })
  }

  isBusy(): boolean {
    return !this.loadingTeamInfo && this.isImgLoaded;
  }

  imgLoaded(event): void {
    this.isImgLoaded = true;
  }

  isHomePageLinkAvailable(): boolean {
    return this.teamInfoUtilsService.isRegisteredTeam(this.teamInfo);
  }

  goToTeamPage(): void {
    if (this.isHomePageLinkAvailable()) {
      this.routerUtilsService.gotoTeamDetailsById((<RegisteredTeamInfo> this.teamInfo).teamId);
    }
  }

}
