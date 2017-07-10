import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TeamInfo} from '../teamInfo';
import {PlayerInfo} from '../playerInfo';
import {Match} from "../match";
import {TeamInMatch} from "../team-in-match";
import {MatchPart} from '../match-part';
import {MatchEvent} from '../match-events';
import {Observable} from 'rxjs/Observable';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-match-cud',
  templateUrl: './match-cud.component.html',
  styleUrls: ['./match-cud.component.scss']
})
export class MatchCudComponent implements OnInit, OnChanges {

  sliderValue: number = 0;
  sliderMax: number = 100;
  sliderMin: number = 0;
  sliderStep: number = 1;

  private teamSelectedSliderValue = 100 * 0.2 / 2; // add teams 20%
  private playersSelectedSliderValue = 100 * 0.2 / 2; // add players 20%
  private scoreAddedSliderValue = 100 * 0.2 / 2; // add score of the match 20%

  /**
   * Date year-month-day of the game, the time will be set in the match parts
  */
  matchDate: Date = new Date();

  scoreForm = new FormGroup({
    scoreHomeTeam: new FormControl(0, Validators.required),
    scoreAwayTeam: new FormControl(0, Validators.required),
  });

  @Input() match: Match = new Match();
  eventToDisplay$: Observable<any>;
  scoreFormChanged$: Observable<{homeTeam: number, awayTeam: number}>;

  constructor() { }

  ngOnInit() {
      if (!this.match.homeTeam && !this.match.awayTeam) {
          this.match.homeTeam = new TeamInMatch();
          this.match.awayTeam = new TeamInMatch();
          this.match.events = [];
      }
      this.scoreFormChanged$ = this.scoreForm.valueChanges;
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  getMatch(): Match {
    return this.match;
  }

  isHomeTeamSelected(): boolean {
    return this.match != null && this.match.homeTeam != null && this.match.homeTeam.teamInfo != null;
  }

  getHomeTeam(): TeamInfo {
    return this.match.homeTeam.teamInfo;
  }

  areHomePlayersSelected(): boolean {
    return this.match != null && this.match.homeTeam != null && this.match.homeTeam.selectedPlayers != null;
  }

  getHomePlayers(): PlayerInfo[] {
    return this.match.homeTeam.selectedPlayers;
  }

  isAwayTeamSelected(): boolean {
    return this.match != null && this.match.awayTeam != null && this.match.awayTeam.teamInfo != null;
  }

  getAwayTeam(): TeamInfo {
    return this.match.awayTeam.teamInfo;
  }

  areAwayPlayersSelected(): boolean {
    return this.match != null && this.match.awayTeam != null && this.match.awayTeam.selectedPlayers != null;
  }

  getAwayPlayers(): PlayerInfo[] {
    return this.match.awayTeam.selectedPlayers;
  }

  homeTeamSelected(teamInfo: TeamInfo) {
    this.sliderValue += this.teamSelectedSliderValue;
    this.match.homeTeam.teamInfo = teamInfo;
  }

  homeTeamRemoved() {
    this.match.homeTeam = new TeamInMatch();
    this.sliderValue -= this.teamSelectedSliderValue;
  }

  awayTeamSelected(teamInfo: TeamInfo) {
    this.sliderValue += this.teamSelectedSliderValue;
    this.match.awayTeam.teamInfo = teamInfo;
  }

  awayTeamRemoved() {
    this.match.awayTeam = new TeamInMatch();
    this.sliderValue -= this.teamSelectedSliderValue;
  }

  homePlayersAdded(homePlayers: PlayerInfo[]): void {
    if (!this.match.homeTeam.selectedPlayers || this.match.homeTeam.selectedPlayers.length === 0) {
      this.sliderValue += this.playersSelectedSliderValue;
    }
    this.match.homeTeam.selectedPlayers = homePlayers;
  }

  awayPlayersAdded(awayPlayers: PlayerInfo[]): void {
    if (!this.match.awayTeam.selectedPlayers || this.match.awayTeam.selectedPlayers.length === 0) {
      this.sliderValue += this.playersSelectedSliderValue;
    }
    this.match.awayTeam.selectedPlayers = awayPlayers;
  }

  matchPartsUpdated(matchParts: MatchPart[]): void {
      this.match.matchParts = matchParts;
      this.updateTimeline();
  }

  shallShowEvent() {
    return this.match != null  && this.match.homeTeam != null && this.match.homeTeam.teamInfo != null &&
        this.match.awayTeam != null && this.match.awayTeam.teamInfo != null && this.match.matchParts != null;
  }

  eventAdded(matchEvent: MatchEvent): void {
      this.match.events.push(matchEvent);
      this.updateTimeline();
  }

  private updateTimeline(): void {
    this.eventToDisplay$ = new Observable(observer => observer.next());
  }

  print() {
      console.log('hi!')
  }

}
