import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatchService} from '../../services/match.service';
import {MatchUtilsService} from '../../services/match-utils.service';

@Component({
  selector: 'app-match-feedback-rewards',
  templateUrl: './match-feedback-rewards.component.html',
  styleUrls: ['./match-feedback-rewards.component.scss']
})
export class MatchFeedbackRewardsComponent implements OnInit {

  @Input() match;
  rewardsValue: {[reward: string]: string} = {};
  @Output() rewardsChange: EventEmitter<{[reward: string]: string}> = new EventEmitter<{[reward: string]: string}>();
  rewardsAvailable: string[];

  constructor(private matchService: MatchService, private matchUtilsService: MatchUtilsService) { }

  ngOnInit() {
    this.matchService.getMatchRewardsForSport('Football')
        .then(rewardsAvailable => {
          this.rewardsAvailable = rewardsAvailable;
        })
        .catch();
  }

  @Input()
  get rewards(): {[reward: string]: string} {
    return this.rewardsValue;
  }

  set rewards(val: {[reward: string]: string}) {
    this.rewardsValue = val;
    this.rewardsChange.emit(this.rewardsValue);
  }

  getRewardsAvailable(): string[] {
    return this.rewardsAvailable
  }

  getRewarded(reward: string): string {
    if (!this.rewardsValue || !this.rewardsValue[reward]) {
      return null;
    }
    return this.rewardsValue[reward];
  }

  onChange(reward: string, playerInfoId: string): void {
    if (!this.rewardsValue) {
      this.rewardsValue = {};
    }
    this.rewardsValue[reward] = playerInfoId;
    this.rewardsChange.emit(this.rewardsValue);
  }

}
