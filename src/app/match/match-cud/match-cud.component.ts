import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TeamInfo} from '../teamInfo';
import {PlayerInfo} from '../playerInfo';
import {Match} from "../match";
import {TeamInMatch} from "../team-in-match";
import {MatchPart} from '../match-part';
import {MatchEvent} from '../match-events';
import {Observable} from 'rxjs/Observable';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatchUtilsService} from '../../services/match-utils.service';

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

  @Input() match: Match = new Match();

  /**
   * Date year-month-day of the game, the time will be set in the match parts
   */
  matchDate: Date = new Date();

  scoreForm = new FormGroup({
    scoreHomeTeam: new FormControl(0, Validators.required),
    scoreAwayTeam: new FormControl(0, Validators.required),
  });

  eventToDisplay$: Observable<any>;
  scoreFormChanged$: Observable<{scoreHomeTeam: number, scoreAwayTeam: number}>;

  constructor(private matchUtilsService: MatchUtilsService) { }

  ngOnInit() {
    if (!this.match.homeTeam && !this.match.awayTeam) {
      this.match.homeTeam = new TeamInMatch();
      this.match.awayTeam = new TeamInMatch();
      this.match.events = [];
      this.scoreFormChanged$ = this.scoreForm.valueChanges;
    }

  }

  ngOnChanges(changes: SimpleChanges) {
  }

  getMatch(): Match {
    return this.match;
  }

  isHomeTeamSelected(): boolean {
    return this.matchUtilsService.isHomeTeamSelected(this.match);
  }

  getHomeTeam(): TeamInfo {
    return this.matchUtilsService.getHomeTeam(this.match);
  }

  areHomePlayersSelected(): boolean {
    return this.matchUtilsService.areHomePlayersSelected(this.match);
  }

  getHomePlayers(): PlayerInfo[] {
    return this.matchUtilsService.getHomePlayers(this.match);
  }

  isAwayTeamSelected(): boolean {
    return this.matchUtilsService.isAwayTeamSelected(this.match);
  }

  getAwayTeam(): TeamInfo {
    return this.matchUtilsService.getAwayTeam(this.match);
  }

  areAwayPlayersSelected(): boolean {
    return this.matchUtilsService.areAwayPlayersSelected(this.match);
  }

  getAwayPlayers(): PlayerInfo[] {
    return this.matchUtilsService.getAwayPlayers(this.match);
  }

  homeTeamSelectedEventHandler(teamInfo: TeamInfo) {
    this.sliderValue += this.teamSelectedSliderValue;
    this.match.homeTeam.teamInfo = teamInfo;
  }

  homeTeamRemovedEventHandler() {
    this.match.homeTeam = new TeamInMatch();
    this.sliderValue -= this.teamSelectedSliderValue;
  }

  awayTeamSelectedEventHandler(teamInfo: TeamInfo) {
    this.sliderValue += this.teamSelectedSliderValue;
    this.match.awayTeam.teamInfo = teamInfo;
  }

  awayTeamRemovedEventHandler() {
    this.match.awayTeam = new TeamInMatch();
    this.sliderValue -= this.teamSelectedSliderValue;
  }

  homePlayersAdded(homePlayers: PlayerInfo[]): void {
    if (!this.match.homeTeam.selectedPlayers || this.match.homeTeam.selectedPlayers.length === 0) {
      this.sliderValue += this.playersSelectedSliderValue;
    }
    this.match.homeTeam.selectedPlayers = homePlayers;
  }

  awayPlayersAddedEventHandler(awayPlayers: PlayerInfo[]): void {
    if (!this.match.awayTeam.selectedPlayers || this.match.awayTeam.selectedPlayers.length === 0) {
      this.sliderValue += this.playersSelectedSliderValue;
    }
    this.match.awayTeam.selectedPlayers = awayPlayers;
  }

  getMatchParts(): MatchPart[] {
    return this.matchUtilsService.getMatchParts(this.match);
  }

  matchPartsUpdated(matchParts: MatchPart[]): void {
      this.match.matchParts = matchParts;
      this.informRestComponents();
  }

  shallShowEvent() {
    return this.match != null  && this.match.homeTeam != null && this.match.homeTeam.teamInfo != null &&
        this.match.awayTeam != null && this.match.awayTeam.teamInfo != null && this.match.matchParts != null;
  }

  eventAdded(matchEvent: MatchEvent): void {
      this.match.events.push(matchEvent);
      this.informRestComponents();
  }

  private informRestComponents(): void {
    this.eventToDisplay$ = new Observable(observer => observer.next());
  }

  getEvents(): MatchEvent[] {
      return this.match.events;
  }

}
