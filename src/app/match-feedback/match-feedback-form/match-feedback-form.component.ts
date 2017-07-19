import {Component, Input, OnInit} from '@angular/core';
import {MatchFeedback} from '../match-feedback';
import {DisplayablePlayerInfo, PlayerInfo} from '../../match/playerInfo';
import {PlayerInfoUtilService} from '../../player-info-util.service';
import {MatchUtilsService} from '../../services/match-utils.service';
import {AppConstants} from '../../app-constants';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-match-feedback-form',
  templateUrl: './match-feedback-form.component.html',
  styleUrls: ['./match-feedback-form.component.scss']
})
export class MatchFeedbackFormComponent implements OnInit {

  @Input() match;
  @Input() matchFeedback;

  displayablePlayer: {[playerInfoId: string]: DisplayablePlayerInfo} = {};

  constructor(private matchUtilsService: MatchUtilsService, private playerInfoUtilsService: PlayerInfoUtilService) { }

  ngOnInit() {
    if (!this.matchFeedback) {
      // set up a default
      this.matchFeedback = new MatchFeedback();
      this.matchFeedback.ratings = {};
      this.getHomePlayers().concat(this.getAwayPlayers()).forEach(playerInfo => {
        this.matchFeedback.ratings[playerInfo.id] = (AppConstants.RATING_MAX_NUMBER_STARS - AppConstants.RATING_MIN_NUMBER_STARS)/2;
        this.playerInfoUtilsService.getDisplayablePlayerInfo(playerInfo)
            .subscribe(displayablePlayerInfo => this.displayablePlayer[playerInfo.id] = displayablePlayerInfo);
      });
    }
  }

  getHomePlayers(): PlayerInfo[] {
    if (this.matchUtilsService.areHomePlayersSelected(this.match)) {
      return this.match.homeTeam.selectedPlayers;
    }
    return [];
  }

  getDisplayableHomePlayers$(): Observable<DisplayablePlayerInfo>[] {
      const a: Observable<DisplayablePlayerInfo>[] = this.getHomePlayers().map(playerInfo => this.playerInfoUtilsService.getDisplayablePlayerInfo(playerInfo));
      return a;
  }

  getAwayPlayers(): PlayerInfo[] {
    return this.match.awayTeam.selectedPlayers;
  }

}
