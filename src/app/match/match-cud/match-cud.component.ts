import { Component, OnInit } from '@angular/core';
import {TeamInfo} from '../teamInfo';
import {PlayerInfo} from "../playerInfo";

@Component({
  selector: 'app-match-cud',
  templateUrl: './match-cud.component.html',
  styleUrls: ['./match-cud.component.scss']
})
export class MatchCudComponent implements OnInit {

  sliderValue = 0;
  private teamSelectedSliderValue = 100 * 0.2 / 2; // add teams 20%
  private playersSelectedSliderValue = 100 * 0.2 / 2; // add players 20%

  matchDate: Date;

  homeTeamInfo: TeamInfo;
  awayTeamInfo: TeamInfo;

  homePlayers: PlayerInfo[];
  awayPlayers: PlayerInfo[];

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

  homePlayersAdded(homePlayers: PlayerInfo[]): void {
    this.homePlayers = homePlayers;
    if (!this.homePlayers || this.homePlayers.length === 0) {
        this.sliderValue += this.playersSelectedSliderValue;
    }
  }

  awayPlayersAdded(awayPlayers: PlayerInfo[]): void {
    this.awayPlayers = awayPlayers;
      if (!this.awayPlayers || this.awayPlayers.length === 0) {
          this.sliderValue += this.playersSelectedSliderValue;
      }
    this.sliderValue += this.playersSelectedSliderValue;
  }

}
