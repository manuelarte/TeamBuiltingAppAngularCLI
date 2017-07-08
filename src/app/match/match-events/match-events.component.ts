import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatchEvent} from '../match-events';
import {Match} from '../match';
import {MatchService} from '../../services/match.service';
import moment = require('moment');

@Component({
  selector: 'app-match-events',
  templateUrl: './match-events.component.html',
  styleUrls: ['./match-events.component.scss'],
  providers: [MatchService]
})
export class MatchEventsComponent implements OnInit {

  @Input() match: Match;

  eventsSchemasLoading = false;
  eventsSchemasErrorLoading = false;
  eventSchemas: {[eventType: string]: any} = {};

  selectedMatchEvent: string;

  myEvent: MatchEvent;

  @Output() eventAdded: EventEmitter<MatchEvent> = new EventEmitter<MatchEvent>();

  constructor(private matchService: MatchService) { }

  ngOnInit() {
      this.eventsSchemasLoading = true;
      this.matchService.getMatchEvents().then(matchEventsSchemas => {
          this.eventsSchemasLoading = false;
          this.eventSchemas = matchEventsSchemas;

          const eventTypes: string[] = Object.keys(this.eventSchemas);
          eventTypes.forEach(eventType => this.eventSchemas[eventType].properties.when.widget = 'when')

      }).catch(error => {
          console.log('error', error);
          this.eventsSchemasLoading = false;
          this.eventsSchemasErrorLoading = true;
      });
  }

  getKeys(): string[] {
    return Object.keys(this.eventSchemas);
  }

  getValue(key: string): {} {
    return this.eventSchemas[key];
  }

  addMockEvent(): void {
      // let event: MatchEvent = {"goal": {when: moment(this.match.matchParts[0].startingTime).add(10, 'minutes').toDate(), teamThatScored: '', description: '', who: "" }};
      let event: MatchEvent = {[this.selectedMatchEvent]: this.myEvent};
      event[this.selectedMatchEvent].when = new Date(event[this.selectedMatchEvent].when);
      console.log('this is what I would send:', event)
      this.eventAdded.emit(event);
  }

};
