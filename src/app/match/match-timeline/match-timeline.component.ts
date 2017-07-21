import {Component, Input, IterableDiffers, OnChanges, OnInit} from '@angular/core';
import {MatchEvent} from '../match-events';
import {Match} from '../match';
import moment = require('moment');
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-match-timeline',
  templateUrl: './match-timeline.component.html',
  styleUrls: ['./match-timeline.component.scss']
})
export class MatchTimelineComponent implements OnInit, OnChanges {

  @Input() match: Match = new Match();
  @Input() $eventToDisplay: Observable<any>;

  eventClicked: Object;

  private pieChartData =  {
        chartType: 'Timeline',
        dataTable: [
            [
                {id: 'Match', type: 'string'},
                {id: 'Dummy bar label', type: 'string'},
                {role: 'tooltip', type: 'string', 'p': {'html': true}},
                { type: 'date', id: 'Start' },
                { type: 'date', id: 'End' }
            ],
            [ 'Match',  'Match Start',   '<b>Hola</b>', new Date(0, 0, 0, 12, 0, 0),  new Date(0, 0, 0, 12, 2, 0) ],
            [ 'Match',  'Intro JavaScript',    'Hola', new Date(0, 0, 0, 14, 30, 0), new Date(0, 0, 0, 16, 0, 0) ],
            [ 'Match',  'Advanced JavaScript', 'Hola', new Date(0, 0, 0, 16, 30, 0), new Date(0, 0, 0, 19, 0, 0) ],
            [ 'Team 1', 'Intermediate Perl',  'Hola', new Date(0, 0, 0, 12, 30, 0), new Date(0, 0, 0, 14, 0, 0) ],
            [ 'Team 1', 'Advanced Perl',      'Hola',  new Date(0, 0, 0, 14, 30, 0), new Date(0, 0, 0, 16, 0, 0) ],
            [ 'Team 1', 'Applied Perl',       'Hola', new Date(0, 0, 0, 16, 30, 0), new Date(0, 0, 0, 18, 0, 0) ],
            [ 'Other Team',   'Google Charts', 'Hola', new Date(0, 0, 0, 12, 30, 0), new Date(0, 0, 0, 14, 0, 0) ],
            [ 'Other Team',   'Closure',       'Hola', new Date(0, 0, 0, 14, 30, 0), new Date(0, 0, 0, 16, 0, 0) ],
        ],
        options: {
            tooltip: {isHtml: true},
        },
  };

    private pieChartData2 =  {
        chartType: 'Timeline',
        dataTable: [
            [ 'Match',  'CSS Fundamentals',    new Date(0, 0, 0, 12, 30, 0), new Date(0, 0, 0, 13, 0, 0) ],
            [ 'Match',  'Intro JavaScript',    new Date(0, 0, 0, 14, 30, 0), new Date(0, 0, 0, 16, 0, 0) ],
            [ 'Match',  'Advanced JavaScript', new Date(0, 0, 0, 16, 30, 0), new Date(0, 0, 0, 19, 0, 0) ],
            [ 'Team 1', 'Intermediate Perl',   new Date(0, 0, 0, 12, 30, 0), new Date(0, 0, 0, 14, 0, 0) ],
            [ 'Team 1', 'Advanced Perl',       new Date(0, 0, 0, 14, 30, 0), new Date(0, 0, 0, 16, 0, 0) ],
            [ 'Team 1', 'Applied Perl',        new Date(0, 0, 0, 16, 30, 0), new Date(0, 0, 0, 18, 0, 0) ],
            [ 'Team 2',   'Google Charts',       new Date(0, 0, 0, 12, 30, 0), new Date(0, 0, 0, 14, 0, 0) ],
            [ 'Team 2',   'Closure',             new Date(0, 0, 0, 14, 30, 0), new Date(0, 0, 0, 16, 0, 0) ],
            [ 'Team 2',   'App Engine',          new Date(0, 0, 0, 16, 30, 0), new Date(0, 0, 0, 18, 30, 0) ]
        ],
        options: {
            tooltip: {isHtml: true},
        },
    };

  private dataForTimeline;

  @Input() events: MatchEvent[] = [];

  constructor() { }

  ngOnInit() {
      this.setTimelineData(false);
      console.log(this.dataForTimeline);
      if (this.$eventToDisplay) {
        this.$eventToDisplay.subscribe(() => this.ngOnChanges())
      }
  }

  ngOnChanges(...args: any[]) {
    this.setTimelineData(true);
  }

  private getHeader(): [Object, Object, Object, Object] {
    return [{type: 'string', id: 'Match Part'},  {type: 'string', id: 'Event'}, { type: 'date', id: 'Start Time' }, { type: 'date', id: 'End Time' }]
  }

  private getMatchPartsRows(): [string, string, Date, Date][] {
      let toReturn: [string, string, Date, Date][] = [];
      if (this.match && this.match.matchParts) {
        this.match.matchParts.forEach((matchPart, i) => {
            const row: [string, string, Date, Date] = ['Match',  i+1 + ' Part',
                new Date(0, 0, 0, new Date(matchPart.startingTime).getHours(), new Date(matchPart.startingTime).getMinutes(), 0),
                new Date(0, 0, 0, new Date(matchPart.endingTime).getHours(), new Date(matchPart.endingTime).getMinutes(), 0)];
            toReturn.push(row)
        })
      }
      return toReturn;
  }

  private getEvents(): [string, string, Date, Date][] {
    let toReturn: [string, string, Date, Date][] = [];
    if (this.match && this.match.events) {
      this.match.events.forEach(matchEvent => {
          const eventType: string = Object.getOwnPropertyNames(matchEvent)[0];
          const row: [string, string, Date, Date] = ['Match Events', eventType,
              new Date(0, 0, 0, new Date(matchEvent[eventType].when).getHours(), new Date(matchEvent[eventType].when).getMinutes(), 0),
              new Date(0, 0, 0, new Date(matchEvent[eventType].when).getHours(), new Date(matchEvent[eventType].when).getMinutes(), 30)];
          toReturn.push(row)
      })
    }
    return toReturn;
  }

  private setTimelineData(update: boolean): void {
    if (!this.dataForTimeline || update) {
        const rows: Object[][] = [];
        rows.push(this.getHeader());
        this.getMatchPartsRows().forEach(matchPartRow => rows.push(matchPartRow));
        this.getEvents().forEach(matchEventRow => rows.push(matchEventRow));
        this.dataForTimeline = {
            chartType: 'Timeline',
            dataTable:
                rows,
            options: {},
        };
    }
    return this.dataForTimeline;
  }

  isReady(): boolean {
    return this.dataForTimeline != null;
  }

}
