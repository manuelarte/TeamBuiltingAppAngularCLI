import jStat = require('jStat');
import {Component, Input, OnInit} from '@angular/core';
import {MatchFeedback} from '../match-feedback';

@Component({
  selector: 'app-match-player-rating',
  templateUrl: './match-player-rating.component.html',
  styleUrls: ['./match-player-rating.component.scss']
})
export class MatchPlayerRatingComponent implements OnInit {

  @Input() playerInfo;
  @Input() matchFeedback: MatchFeedback[];

  constructor() { }

  ngOnInit() {
  }

  hasPlayerRatingFeedback(): boolean {
    return this.ratingsForPlayer().length > 0;
  }

  matchFeedbackThatRateThePlayer(): MatchFeedback[] {
    return this.matchFeedback.filter(matchFeedback => matchFeedback.ratings[this.playerInfo.id]);
  }

  ratingsForPlayer(): number[] {
    return this.matchFeedbackThatRateThePlayer().map(matchFeedback => matchFeedback.ratings[this.playerInfo.id]);
  }

  calculateAverage(): number {
    return jStat(this.ratingsForPlayer()).median();
  }

  getRatingValuesForUsers(): {[stars: number]: {userId: string}[]} {
    const toReturn: {[stars: number]: {userId: string}[]} = {};
    this.matchFeedbackThatRateThePlayer().forEach(matchFeedback => {
      const value: {userId: string} = {userId: matchFeedback.userId};
      const stars: number = matchFeedback.ratings[this.playerInfo.id];
      if (!toReturn[stars]) {
        toReturn[stars] = [];
      }
      toReturn[stars].push(value)
    });
    return toReturn;
  }

  getKeys(object: any): string[] {
    return Object.keys(object);
  }

}
