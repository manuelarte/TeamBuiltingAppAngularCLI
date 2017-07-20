import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatchFeedback} from '../match-feedback';
import {DisplayablePlayerInfo, PlayerInfo} from '../../match/playerInfo';
import {PlayerInfoUtilService} from '../../player-info-util.service';
import {MatchUtilsService} from '../../services/match-utils.service';
import {AppConstants} from '../../app-constants';
import {DisplayableTeamInfo, TeamInfo} from '../../match/teamInfo';
import {TeamInfoUtilService} from '../../team-info-util.service';
import {MatchService} from '../../services/match.service';

@Component({
  selector: 'app-match-feedback-form',
  templateUrl: './match-feedback-form.component.html',
  styleUrls: ['./match-feedback-form.component.scss']
})
export class MatchFeedbackFormComponent implements OnInit, OnChanges {

  @Input() match;
  loadingMatchFeedback = false;
  errorLoadingMatchFeedback
  matchFeedback;

  displayablePlayer: {[playerInfoId: string]: DisplayablePlayerInfo} = {};
  displayableTeam: {[teamInfoId: string]: DisplayableTeamInfo} = {};

  constructor(private matchService: MatchService, private matchUtilsService: MatchUtilsService, private playerInfoUtilsService: PlayerInfoUtilService,
              private teamInfoUtilsService: TeamInfoUtilService) { }

  ngOnInit() {
    this.loadingMatchFeedback = true;
    this.matchService.getMyMatchFeedback(this.match.id).then(matchFeedback => {
      this.loadingMatchFeedback = false;
    }).catch(error => {
      this.loadingMatchFeedback = false;
      this.errorLoadingMatchFeedback = true;
    });


    if (!this.matchFeedback) {
      // set up a default
      this.matchFeedback = new MatchFeedback();
      this.matchFeedback.ratings = {};

      this.getHomePlayers().concat(this.getAwayPlayers()).forEach(playerInfo => {
        this.matchFeedback.ratings[playerInfo.id] = (AppConstants.RATING_MAX_NUMBER_STARS - AppConstants.RATING_MIN_NUMBER_STARS)/2;
        this.playerInfoUtilsService.getDisplayablePlayerInfo(playerInfo)
            .subscribe(displayablePlayerInfo => this.displayablePlayer[playerInfo.id] = displayablePlayerInfo);
      });

      this.teamInfoUtilsService.getDisplayableTeamInfo(this.match.homeTeam.teamInfo)
          .subscribe(displayableTeamInfo => this.displayableTeam[this.match.homeTeam.teamInfo.id] = displayableTeamInfo);

      this.teamInfoUtilsService.getDisplayableTeamInfo(this.match.awayTeam.teamInfo)
            .subscribe(displayableTeamInfo => this.displayableTeam[this.match.awayTeam.teamInfo.id] = displayableTeamInfo);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // TODO, if a new player is added, it does not load the picture, so we need to load the picture,
    // I think we need to subscribe to player added event and then load the picture
    console.log(changes)
  }

  getHomePlayers(): PlayerInfo[] {
    if (this.matchUtilsService.areHomePlayersSelected(this.match)) {
      return this.match.homeTeam.selectedPlayers;
    }
    return [];
  }

  getAwayPlayers(): PlayerInfo[] {
    return this.match.awayTeam.selectedPlayers;
  }

  getHomeTeam(): TeamInfo {
    return this.match.homeTeam.teamInfo;
  }

  getAwayTeam(): TeamInfo {
    return this.match.awayTeam.teamInfo;
  }

}
