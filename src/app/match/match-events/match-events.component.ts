import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {GoalMatchEvent, MatchEvent} from '../match-events';
import {Match} from '../match';
import {MatchService} from '../../services/match.service';
import moment = require('moment');
import {DataSource} from '@angular/cdk';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-match-events',
  templateUrl: './match-events.component.html',
  styleUrls: ['./match-events.component.scss'],
  providers: [MatchService]
})
export class MatchEventsComponent implements OnInit {

  @Input() match: Match;
  @Input() scoreFormChanged$: Observable<{scoreHomeTeam: number, scoreAwayTeam: number}>;

  eventsSchemasLoading = false;
  eventsSchemasErrorLoading = false;
  eventSchemas: {[eventType: string]: any} = {};

  numberOfEvents: number;

  selectedMatchEvent: string;

  myEvent: MatchEvent;

  goalEvents: {homeTeam: GoalMatchEvent[], awayTeam: GoalMatchEvent[]} = {homeTeam: [], awayTeam: []};

  @Output() eventAdded: EventEmitter<MatchEvent> = new EventEmitter<MatchEvent>();

  constructor(private matchService: MatchService) { }

  ngOnInit() {

      if (this.scoreFormChanged$) {
        this.scoreFormChanged$.subscribe(x => {
            console.log(x);
            this.adjustGoalEvents(x);
        });
      }

      this.eventsSchemasLoading = true;
      this.matchService.getMatchEvents().then(matchEventsSchemas => {
          this.eventSchemas = {};

          const eventTypes: string[] = Object.keys(matchEventsSchemas);
          this.numberOfEvents = eventTypes.length;
          eventTypes.forEach(eventType => {
              // set the schema
              this.eventSchemas[eventType] = matchEventsSchemas[eventType].schema;
              // set the widgets in each property
              const propertiesWithSpecialWidget: string[] = Object.keys(matchEventsSchemas[eventType].widget);
              propertiesWithSpecialWidget.forEach(property =>{
                  this.eventSchemas[eventType].properties[property].widget = {
                      id: matchEventsSchemas[eventType].widget[property].id,
                      match: this.match
                  }
              });

              this.eventsSchemasLoading = false;

          })

      }).catch(error => {
          console.log('error', error);
          this.eventsSchemasLoading = false;
          this.eventsSchemasErrorLoading = true;
      });
  }

  getKeys(): string[] {
    return Object.keys(this.eventSchemas).filter(eventSchema => "goal" !== eventSchema);
  }

  getValue(key: string): {} {
    return this.eventSchemas[key];
  }

  isReady(): boolean {
    return this.eventsSchemasLoading == false && this.eventsSchemasErrorLoading == false && Object.keys(this.eventSchemas).length === this.numberOfEvents;
  }

  addMockEvent(): void {
      // let event: MatchEvent = {"goal": {when: moment(this.match.matchParts[0].startingTime).add(10, 'minutes').toDate(), teamThatScored: '', description: '', who: "" }};
      let event: MatchEvent = {[this.selectedMatchEvent]: this.myEvent};
      event[this.selectedMatchEvent].when = new Date(event[this.selectedMatchEvent].when);
      console.log('this is what I would send:', event)
      this.eventAdded.emit(event);
  }

  private adjustGoalEvents(x: {scoreHomeTeam: number, scoreAwayTeam: number}): void {
      console.log('x:',x)
      const actualHomeTeamGoals: number = x.scoreHomeTeam;
      const awayHomeTeamGoals: number = x.scoreAwayTeam;
      let displayedHomeTeamGoals = this.goalEvents.homeTeam? this.goalEvents.homeTeam: 0;
      let displayedtAwayTeamGoals = this.goalEvents.awayTeam? this.goalEvents.awayTeam: 0;

      if (displayedHomeTeamGoals !== actualHomeTeamGoals) {
          if (displayedHomeTeamGoals < actualHomeTeamGoals) {
              const goal: GoalMatchEvent = new GoalMatchEvent();
              goal.goal.teamThatScored = this.match.homeTeam.teamInfo.id;
              this.goalEvents.homeTeam.push(goal);
          } else {

          }
      }

      console.log('adjusted:', this.goalEvents)

  }

}
