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
import moment = require('moment');
import {Moment} from 'moment';
import {MatchFeedback} from '../../match-feedback/match-feedback';
import {Messages} from 'primeng/primeng';

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
  @Input() private editable = true;
  @Input() allUsersMatchFeedback: MatchFeedback[] = [];

  /**
   * Date year-month-day of the game, the time will be set in the match parts
   */
  matchDate: Date = new Date();

  scoreForm: FormGroup;

  homeTeamSelected$: Observable<TeamInfo>;
  homeTeamRemoved$: Observable<any>;
  awayTeamSelected$: Observable<TeamInfo>;
  awayTeamRemoved$: Observable<any>;

  msgs: Messages = new Messages();

  eventToDisplay$: Observable<any>;
  scoreFormChanged$: Observable<{scoreHomeTeam: number, scoreAwayTeam: number}>;

  constructor(private matchUtilsService: MatchUtilsService) { }

  ngOnInit() {
    this.msgs.value = [];
    this.msgs.closable = false;
    this.msgs.value.push({severity:'warn', summary:'Team Not Selected', detail:'Please select a team before adding players'});

    this.scoreForm = new FormGroup({
      scoreHomeTeam: new FormControl({value: 0, disabled: !this.editable}, Validators.required),
      scoreAwayTeam: new FormControl({value: 0, disabled: !this.editable}, Validators.required),
    });

    if (!this.match.homeTeam && !this.match.awayTeam) {
      this.match.homeTeam = new TeamInMatch();
      this.match.awayTeam = new TeamInMatch();
      this.match.events = [];
      this.match.tags = [];
      this.scoreFormChanged$ = this.scoreForm.valueChanges;
    }

    if (this.match && this.match.matchParts && this.matchUtilsService.getMatchParts(this.match).length > 0) {
      this.matchDate = new Date(this.matchUtilsService.getMatchParts(this.match)[0].startingTime);
    }

    if (this.match) {
      this.scoreForm.setValue({
        scoreHomeTeam: this.matchUtilsService.getHomeTeamGoals(this.match).length,
        scoreAwayTeam: this.matchUtilsService.getAwayTeamGoals(this.match).length
      });
    }

  }

  ngOnChanges(changes: SimpleChanges) {
  }

  isEditable(): boolean {
    return this.editable;
  }

  getMatch(): Match {
    return this.match;
  }

  isHomeTeamSelected(): boolean {
    return this.matchUtilsService.isHomeTeamSelected(this.match);
  }

  getHomeTeam(): TeamInfo {
    return this.isHomeTeamSelected() ? this.matchUtilsService.getHomeTeam(this.match) : null;
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
    return this.isAwayTeamSelected() ? this.matchUtilsService.getAwayTeam(this.match) : null;
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
    this.homeTeamSelected$ = new Observable(observer => observer.next(teamInfo));
  }

  homeTeamRemovedEventHandler() {
    this.match.homeTeam = new TeamInMatch();
    this.sliderValue -= this.teamSelectedSliderValue;
    this.homeTeamRemoved$ = new Observable(observer => observer.next());
  }

  awayTeamSelectedEventHandler(teamInfo: TeamInfo) {
    this.sliderValue += this.teamSelectedSliderValue;
    this.match.awayTeam.teamInfo = teamInfo;
    this.awayTeamSelected$ = new Observable(observer => observer.next(teamInfo));
  }

  awayTeamRemovedEventHandler() {
    this.match.awayTeam = new TeamInMatch();
    this.sliderValue -= this.teamSelectedSliderValue;
    this.awayTeamRemoved$ = new Observable(observer => observer.next());
  }

  homePlayersAddedEventHandler(homePlayers: PlayerInfo[]): void {
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

  onMatchDateChange(matchDate: Date) {
    this.matchDate = new Date(matchDate);
    const momentDate: Moment  = moment(this.matchDate);
    this.matchUtilsService.getMatchParts(this.match).forEach(part => {
      part.startingTime = new Date(part.startingTime);
      part.endingTime = new Date(part.endingTime);
      const duration: number = part.getDuration();
      part.startingTime = moment(part.startingTime).set('year', momentDate.get('year'))
          .set('month', momentDate.get('month')).set('date', momentDate.get('date')).toDate();
      part.endingTime = new Date(part.startingTime.getTime() + duration);
    });
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

  private getHomeTeamGoals(): MatchEvent[] {
    return this.matchUtilsService.getHomeTeamGoals(this.match);
  }

  getEvents(): MatchEvent[] {
      return this.match.events;
  }

  isMatchReadyForFeedback(): boolean {
    return this.matchUtilsService.isMatchReadyForMatchFeedback(this.match);
  }

}
