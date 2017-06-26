import { Component, OnInit } from '@angular/core';
import {TeamInfo} from '../teamInfo';

@Component({
  selector: 'app-match-cud',
  templateUrl: './match-cud.component.html',
  styleUrls: ['./match-cud.component.scss']
})
export class MatchCudComponent implements OnInit {

  sliderValue = 0;
  private teamSelectedSliderValue = 100 * 0.2 / 2;

  homeTeamInfo: TeamInfo;
  awayTeamInfo: TeamInfo;

  constructor() { }

  ngOnInit() {
  }

  homeTeamSelected(teamInfo: TeamInfo) {
    this.homeTeamInfo = teamInfo;
    this.sliderValue += this.teamSelectedSliderValue;
  }

  homeTeamRemoved() {
    this.homeTeamInfo = null;
    this.sliderValue -= this.teamSelectedSliderValue;
  }

  awayTeamSelected(teamInfo: TeamInfo) {
    this.awayTeamInfo = teamInfo;
    this.sliderValue += this.teamSelectedSliderValue;
  }

  awayTeamRemoved() {
    this.awayTeamInfo = null;
    this.sliderValue -= this.teamSelectedSliderValue;
  }

}
