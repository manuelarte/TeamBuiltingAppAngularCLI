import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {GoalMatchEvent, MatchEvent} from '../match-events';
import {Match} from '../match';
import {MatchService} from '../../services/match.service';
import moment = require('moment');
import {Observable} from 'rxjs/Observable';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-match-events',
  templateUrl: './match-events.component.html',
  styleUrls: ['./match-events.component.scss'],
  providers: [MatchService]
})
export class MatchEventsComponent implements OnInit {

  @Input() match: Match;
  @Input() scoreFormChanged$: Observable<{scoreHomeTeam: number, scoreAwayTeam: number}>;
  @Input() private editable = true;

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
        console.log(matchEventsSchemas)
        this.eventSchemas = {};

        const eventTypes: string[] = Object.keys(matchEventsSchemas);
        this.numberOfEvents = eventTypes.length;
        eventTypes.forEach(eventType => {
            // set the schema
            this.eventSchemas[eventType] = matchEventsSchemas[eventType].schema;

            // set the widgets in each property
            const propertiesWithSpecialWidget: string[] = Object.keys(matchEventsSchemas[eventType].ui.properties)
                  .filter(propertyName => matchEventsSchemas[eventType].ui.properties[propertyName].widget);
            propertiesWithSpecialWidget.forEach(property =>{
              this.eventSchemas[eventType].properties[property].widget = {
                id: matchEventsSchemas[eventType].ui.properties[property].widget.id,
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

  isEditable(): boolean {
    return this.editable;
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
      let displayedHomeTeamGoals: number = this.goalEvents.homeTeam? this.goalEvents.homeTeam.length: 0;
      let displayedAwayTeamGoals: number = this.goalEvents.awayTeam? this.goalEvents.awayTeam.length: 0;
      console.log('actualHomeTeamGoals:', actualHomeTeamGoals);
      console.log('displayedHomeTeamGoals:', displayedHomeTeamGoals);

      if (displayedHomeTeamGoals !== actualHomeTeamGoals) {
          if (displayedHomeTeamGoals < actualHomeTeamGoals) {
            const goal: GoalMatchEvent = new GoalMatchEvent();
            goal.goal = {
              id: UUID.UUID(),
              when: this.match.matchParts[0].startingTime,
              who: null,
              teamThatScored: this.match.homeTeam.teamInfo.id,
              description: ''
            };
            this.goalEvents.homeTeam.push(goal);
            this.eventAdded.emit(goal);
          } else {

          }
      }

      console.log('adjusted:', this.goalEvents)

  }

}
