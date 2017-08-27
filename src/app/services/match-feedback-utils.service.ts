import { Injectable } from '@angular/core';
import {MatchFeedback} from '../match-feedback/match-feedback';

@Injectable()
export class MatchFeedbackUtilsService {

  constructor() { }

  getMatchFeedbackThatVotedForReward(allMatchFeedback: MatchFeedback[], reward: string): MatchFeedback[] {
    let matchFeedbackWithReward: MatchFeedback[] = [];
    if (allMatchFeedback) {
        matchFeedbackWithReward = allMatchFeedback.filter(matchFeedback =>
            matchFeedback.rewards && matchFeedback.rewards[reward] != null);
    }
    return matchFeedbackWithReward;
  }

  mapReward(allMatchFeedback: MatchFeedback[], reward: string): {[playerId: number]: MatchFeedback[]} {
    let toReturn: {[playerId: string]: MatchFeedback[]} = {};
    const matchFeedbackThatVotedForReward: MatchFeedback[] = this.getMatchFeedbackThatVotedForReward(allMatchFeedback, reward);
    const rewardeds: string[] = matchFeedbackThatVotedForReward.map(matchFeedback => matchFeedback.rewards[reward]);
    rewardeds.forEach(rewarded =>
        toReturn[rewarded] = matchFeedbackThatVotedForReward.filter(matchFeedback =>
            matchFeedback.rewards[reward] == rewarded));
    return toReturn;
  }

}
