import { Component, OnInit, Input } from '@angular/core';
import {PlayerHistoryUtilsService} from "../../services/player-history-utils.service";
import {PlayerToTeam} from "../../player-to-team";
import {Team} from "../../team";

@Component({
  selector: 'app-player-detail-intro',
  templateUrl: './player-detail-intro.component.html',
  styleUrls: ['./player-detail-intro.component.scss'],
  providers: [PlayerHistoryUtilsService]
})
export class PlayerDetailIntroComponent implements OnInit {

  /**
   * Player history already sorted by from date
  */
  @Input() playerHistory: PlayerToTeam[] = [];
  @Input() teamsByTeamId: {[id: string]: Team} = {};

  constructor(private playerHistoryUtilsService: PlayerHistoryUtilsService) { }

  ngOnInit() {
  }

  getTimelineData() {
    let rows = [];
    rows.push(['Team Name', 'From Date', 'To Date']);
	this.playerHistory.forEach(entry => rows.push([this.teamsByTeamId[entry.teamId].name, entry.fromDate, entry.toDate ? entry.toDate : new Date() ]))
	return rows;
  }

}
