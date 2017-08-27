import {Component, Input, OnInit} from '@angular/core';
import {MatchFeedback} from '../match-feedback';
import {MatchFeedbackUtilsService} from '../../services/match-feedback-utils.service';
import {PlayerInfoUtilService} from '../../player-info-util.service';
import {MatchUtilsService} from '../../services/match-utils.service';
import {DisplayablePlayerInfo, PlayerInfo} from '../../match/playerInfo';

@Component({
  selector: 'app-match-feedback-rewards-display',
  templateUrl: './match-feedback-rewards-display.component.html',
  styleUrls: ['./match-feedback-rewards-display.component.scss']
})
export class MatchFeedbackRewardsDisplayComponent implements OnInit {

  @Input() match;
  @Input() allUsersMatchFeedback: MatchFeedback[] = [];

  manOfTheMatch: DisplayablePlayerInfo;

  constructor(private playerInfoUtilService: PlayerInfoUtilService,
              private matchUtils: MatchUtilsService,
              private matchFeedbackUtils: MatchFeedbackUtilsService) { }

  ngOnInit() {
    const mapReward: {[playerId: number]: MatchFeedback[]} = this.matchFeedbackUtils.mapReward(this.allUsersMatchFeedback, 'MAN_OF_THE_MATCH');
    const playerUid: string = this.getTop(mapReward);
    const playerInfo: PlayerInfo = this.matchUtils.getAllPlayers(this.match).filter(playerInfo => playerInfo.id === playerUid)[0];
    console.log(playerInfo);
    this.playerInfoUtilService.getDisplayablePlayerInfo(playerInfo).subscribe(displayablePlayerInfo => this.manOfTheMatch = displayablePlayerInfo);
  }

  getTop(mapReward: {[playerId: number]: MatchFeedback[]}): string {
    let playerNominated: string[] = Object.keys(mapReward);
    let max: number = mapReward[playerNominated[0]].length;
    let toReturn: string = playerNominated[0];
    playerNominated.forEach(key => {
      if (max < mapReward[key].length) {
        toReturn = playerNominated[key]
      }
    });
    return toReturn;
  }

}
