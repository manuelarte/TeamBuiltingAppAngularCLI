import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatchService} from '../../services/match.service';
import {PlayerInfo} from '../../match/playerInfo';

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

  constructor(private matchService: MatchService) { }

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
    console.log('emitting:', this.rewardsValue)
  }

  getRewardsAvailable(): string[] {
    return this.rewardsAvailable
  }

  onChange(reward: string, playerInfo: PlayerInfo): void {
    if (!this.rewardsValue) {
      this.rewardsValue = {};
    }
    this.rewardsValue[reward] = playerInfo.id;
    console.log('rewards:', this.rewardsValue)
    this.rewardsChange.emit(this.rewardsValue);
  }

}
