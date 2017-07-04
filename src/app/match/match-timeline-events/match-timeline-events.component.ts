import {Component, Input, OnInit} from '@angular/core';
import {MatchEvent} from '../match-events';
import {Match} from '../match';
import {MatchService} from '../../services/match.service';

@Component({
  selector: 'app-match-timeline-events',
  templateUrl: './match-timeline-events.component.html',
  styleUrls: ['./match-timeline-events.component.scss'],
  providers: [MatchService]
})
export class MatchTimelineEventsComponent implements OnInit {

  @Input() match: Match;

  eventsSchemasLoading = false;
  eventsSchemasErrorLoading = false;
  eventSchemas: {[eventType: string]: {}} = {};

  selectedMatchEvent: string;

  myEvent: MatchEvent;

  constructor(private matchService: MatchService) { }

  ngOnInit() {
      this.eventsSchemasLoading = true;
      this.matchService.getMatchEvents().then(matchEventsSchemas => {
          this.eventsSchemasLoading = false;
          this.eventSchemas = matchEventsSchemas;
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

};
