import jStat = require('jStat');
import {Component, Input, OnInit} from '@angular/core';
import {MatchFeedback} from '../match-feedback';
import {UserService} from '../../services/user.service';
import {User} from '../../user';

@Component({
  selector: 'app-match-player-rating',
  templateUrl: './match-player-rating.component.html',
  styleUrls: ['./match-player-rating.component.scss'],
  providers: [UserService]
})
export class MatchPlayerRatingComponent implements OnInit {

  @Input() playerInfo;
  @Input() matchFeedback: MatchFeedback[];
  ratingFeedbackForPlayer: {[stars: number]: {userId: string}[]};
  loadingUserMap = true;
  errorLoadingUserMap = false;
  userMap: {[userId: string]: User} = {};


  constructor(private userService: UserService) { }

  ngOnInit() {
    if (this.hasPlayerRatingFeedback()) {
      const feedbackWithUserId: MatchFeedback[] = this.matchFeedbackThatRateThePlayer().filter(matchFeedback => matchFeedback.userId);
      feedbackWithUserId.forEach(matchFeedback => {
        this.userService.getUser(matchFeedback.userId).then(user => {
        this.userMap[matchFeedback.userId] = user;
        this.loadingUserMap = false;
        });
      });
    } else {
      this.loadingUserMap = false;
    }
  }

  isBusy(): boolean {
    return this.loadingUserMap;
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

  getPicture(userId: string): string {
    let toReturn: string = 'https://www.smashingmagazine.com/wp-content/uploads/2015/06/10-dithering-opt.jpg';
    if (this.userMap[userId]) {
      toReturn = this.userMap[userId].picture
    }
    return toReturn;
  }

  private getRatingValuesForUsers(): {[stars: number]: {userId: string}[]} {
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
