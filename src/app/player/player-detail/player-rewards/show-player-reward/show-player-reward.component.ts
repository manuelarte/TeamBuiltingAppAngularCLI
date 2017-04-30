import {Component, OnInit, Input}      from '@angular/core';
import {Team} from "../../../../team";
import {Season, SeasonUtilService} from "../../../../services/season-utils.service";
import {PlayerReward} from "../../../../player-reward";


@Component({
  selector: 'show-player-reward',
  templateUrl: 'show-player-reward.component.html',
  styleUrls: ['show-player-reward.component.scss'],
  providers: [SeasonUtilService ]
})
export class ShowPlayerRewardComponent implements OnInit {

  @Input() playerReward: PlayerReward;
  @Input() team: Team;
  @Input() user: any;

  private seasonStartsInMonth: number = 8; // September

  constructor(private seasonUtilService: SeasonUtilService
  ) {}

  ngOnInit(): void {
  }

  getSeason(fromDate: Date): string {
    let season: Season = this.seasonUtilService.getSeasonForDate(fromDate, this.seasonStartsInMonth);
    return  season.startDate.getFullYear() + "-" + season.endDate.getFullYear();
  }

}
