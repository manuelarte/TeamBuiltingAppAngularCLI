import jStat = require('jStat');
import {Component, Input, OnInit} from '@angular/core';
import {MatchFeedback} from '../match-feedback';
import {UserService} from '../../services/user.service';
import {User} from '../../user';
import {AppConstants} from '../../app-constants';

@Component({
  selector: 'app-match-show-player-rating',
  templateUrl: './match-show-player-rating.component.html',
  styleUrls: ['./match-show-player-rating.component.scss'],
  providers: [UserService]
})
export class MatchShowPlayerRatingComponent implements OnInit {

  @Input() playerInfo;
  @Input() allUsersMatchFeedback: MatchFeedback[] = [];
  ratingFeedbackForPlayer: {[stars: number]: {userId: string}[]};
  loadingUserMap = true;
  errorLoadingUserMap = false;
  userMap: {[userId: string]: User} = {};


  maxNumberStars: number = AppConstants.RATING_MAX_NUMBER_STARS;

  constructor(private userService: UserService) { }

  ngOnInit() {
    if (this.hasPlayerRatingFeedback() &&
        this.matchFeedbackThatRateThePlayer().filter(matchFeedback => matchFeedback.userId).length > 0) {
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
    return this.allUsersMatchFeedback.filter(matchFeedback => matchFeedback.ratings[this.playerInfo.id] != null);
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
