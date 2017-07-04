import {Component, Input, OnInit} from '@angular/core';
import {TeamInfo} from '../teamInfo';
import {PlayerInfo} from '../playerInfo';
import {Match} from "../match";
import {TeamInMatch} from "../team-in-match";

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

  @Input() match: Match;

  constructor() { }

  ngOnInit() {
      if (!this.match) {
          this.match = new Match();
          this.match.homeTeam = new TeamInMatch();
          this.match.awayTeam = new TeamInMatch();
      }
  }

  homeTeamSelected(teamInfo: TeamInfo) {
    this.homeTeamInfo = teamInfo;
    this.sliderValue += this.teamSelectedSliderValue;
    this.match.homeTeam.teamInfo = this.homeTeamInfo;
  }

  homeTeamRemoved() {
    this.homeTeamInfo = null;
    this.sliderValue -= this.teamSelectedSliderValue;
    this.match.homeTeam.teamInfo = null;
  }

  awayTeamSelected(teamInfo: TeamInfo) {
    this.awayTeamInfo = teamInfo;
    this.sliderValue += this.teamSelectedSliderValue;
    this.match.awayTeam.teamInfo = this.awayTeamInfo;
  }

  awayTeamRemoved() {
    this.awayTeamInfo = null;
    this.sliderValue -= this.teamSelectedSliderValue;
    this.match.awayTeam.teamInfo = null;
  }

  homePlayersAdded(homePlayers: PlayerInfo[]): void {
    this.homePlayers = homePlayers;
    if (!this.homePlayers || this.homePlayers.length === 0) {
        this.sliderValue += this.playersSelectedSliderValue;
    }
    this.match.homeTeam.selectedPlayers = this.homePlayers;
  }

  awayPlayersAdded(awayPlayers: PlayerInfo[]): void {
    this.awayPlayers = awayPlayers;
      if (!this.awayPlayers || this.awayPlayers.length === 0) {
          this.sliderValue += this.playersSelectedSliderValue;
      }
    this.sliderValue += this.playersSelectedSliderValue;
    this.match.awayTeam.selectedPlayers = this.awayPlayers;
  }

    printMatch() {
      console.log(this.match);
    }

    shallShowEvent() {
      return this.match != null  && this.match.homeTeam != null && this.match.awayTeam != null;
    }

}
