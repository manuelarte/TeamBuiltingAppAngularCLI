import { Injectable } from '@angular/core';
import {MatchFeedback} from '../match-feedback/match-feedback';
import {MatchUtilsService} from "./match-utils.service";
import {Match} from "../match/match";

@Injectable()
export class MatchFeedbackUtilsService {

  constructor(private matchUtilsService: MatchUtilsService) { }

  isMatchReadyForMatchFeedback(match: Match): boolean {
    return this.matchUtilsService.isHomeTeamSelected(match) && this.matchUtilsService.isAwayTeamSelected(match) &&
      this.matchUtilsService.areHomePlayersSelected(match) && this.matchUtilsService.areAwayPlayersSelected(match);
  }

  getMatchFeedbackThatVotedForReward(allMatchFeedback: MatchFeedback[], reward: string): MatchFeedback[] {
    let matchFeedbackWithReward: MatchFeedback[] = [];
    if (allMatchFeedback) {
      matchFeedbackWithReward = allMatchFeedback.filter(matchFeedback =>
        matchFeedback.rewards && matchFeedback.rewards[reward] != null);
    }
    return matchFeedbackWithReward;
  }

  mapReward(allMatchFeedback: MatchFeedback[], reward: string): {[playerInfoId: number]: MatchFeedback[]} {
    let toReturn: {[playerInfoId: string]: MatchFeedback[]} = {};
    const matchFeedbackThatVotedForReward: MatchFeedback[] = this.getMatchFeedbackThatVotedForReward(allMatchFeedback, reward);
    const rewardeds: string[] = matchFeedbackThatVotedForReward.map(matchFeedback => matchFeedback.rewards[reward]);
    rewardeds.forEach(rewarded =>
        toReturn[rewarded] = matchFeedbackThatVotedForReward.filter(matchFeedback =>
            matchFeedback.rewards[reward] == rewarded));
    return toReturn;
  }

}
