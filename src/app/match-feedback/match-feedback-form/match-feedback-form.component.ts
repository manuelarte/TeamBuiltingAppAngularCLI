import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IncomingMatchFeedback} from '../match-feedback';
import {PlayerInfo} from '../../match/playerInfo';
import {PlayerInfoUtilService} from '../../player-info-util.service';
import {MatchUtilsService} from '../../services/match-utils.service';
import {AppConstants} from '../../app-constants';
import {TeamInfo} from '../../match/teamInfo';
import {TeamInfoUtilService} from '../../team-info-util.service';
import {MatchService} from '../../services/match.service';
import {DisplayableItemInfo, ItemInfo} from '../../match/team-in-match';
import {Auth} from '../../services/auth-service';

@Component({
  selector: 'app-match-feedback-form',
  templateUrl: './match-feedback-form.component.html',
  styleUrls: ['./match-feedback-form.component.scss']
})
export class MatchFeedbackFormComponent implements OnInit, OnChanges {

  @Input() match;
  loadingMatchFeedback = false;
  errorLoadingMatchFeedback = false;

  submittingMatchFeedback = false;
  errorSubmittingMatchFeedback = false;
  matchFeedback: IncomingMatchFeedback;

  displayableItem: {[itemInfoId: string]: DisplayableItemInfo} = {};

  msgs = [];

  constructor(private auth: Auth, private matchService: MatchService, private matchUtilsService: MatchUtilsService,
              private playerInfoUtilsService: PlayerInfoUtilService, private teamInfoUtilsService: TeamInfoUtilService) { }

  ngOnInit() {
    this.msgs.push({severity:'warn', summary:'Not Authenticated', detail:'You have to be authenticated to give feedback'});

    this.loadingMatchFeedback = true;
    this.matchService.getMyMatchFeedback(this.match.id).then(matchFeedback => {
      this.loadingMatchFeedback = false;
      this.matchFeedback = matchFeedback;
    }).catch(error => {
      console.error(error)
      this.loadingMatchFeedback = false;
      if (error.status == 400 && error.json().errorCode === '0021') {
        this.matchFeedback = this.createDefaultMatchFeedback();
      } else {
        this.errorLoadingMatchFeedback = true;
      }
    });

    this.getHomePlayers().concat(this.getAwayPlayers()).forEach(playerInfo => {
        this.playerInfoUtilsService.getDisplayablePlayerInfo(playerInfo)
            .subscribe(displayablePlayerInfo => this.displayableItem[playerInfo.id] = displayablePlayerInfo);
    });

    this.teamInfoUtilsService.getDisplayableTeamInfo(this.getHomeTeam())
          .subscribe(displayableTeamInfo => this.displayableItem[this.getHomeTeam().id] = displayableTeamInfo);

    this.teamInfoUtilsService.getDisplayableTeamInfo(this.getAwayTeam())
            .subscribe(displayableTeamInfo => this.displayableItem[this.getAwayTeam().id] = displayableTeamInfo);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // TODO, if a new player is added, it does not load the picture, so we need to load the picture,
    // I think we need to subscribe to player added event and then load the picture
    console.log(changes)
  }

  private createDefaultMatchFeedback(): IncomingMatchFeedback {
      const matchFeedback: IncomingMatchFeedback = new IncomingMatchFeedback();
      matchFeedback.matchId = this.match.id;
      matchFeedback.ratings = {};

      this.getAllItemsToRate().forEach(itemInfo => {
        matchFeedback.ratings[itemInfo.id] = (AppConstants.RATING_MAX_NUMBER_STARS - AppConstants.RATING_MIN_NUMBER_STARS)/2;
      });
      return matchFeedback;
  }

  getAllItemsToRate(): ItemInfo[] {
    return this.getHomePlayers().concat(this.getAwayPlayers()).concat(this.getHomeTeam()).concat(this.getAwayTeam());
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

  onSubmit(): void {
    this.submittingMatchFeedback = true;
    this.errorSubmittingMatchFeedback = false;
    this.matchService.saveMatchFeedback(this.matchFeedback).then(matchFeedback => {
      this.matchFeedback = matchFeedback;
      this.submittingMatchFeedback = false;
      this.errorSubmittingMatchFeedback = false;
    }).catch(error => {
      this.submittingMatchFeedback = false;
      this.errorSubmittingMatchFeedback = true;
    });
  }

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

}
