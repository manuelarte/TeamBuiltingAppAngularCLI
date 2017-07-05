import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MatchEvent} from '../match-events';
import {Match} from '../match';
import moment = require('moment');

@Component({
  selector: 'app-match-timeline',
  templateUrl: './match-timeline.component.html',
  styleUrls: ['./match-timeline.component.scss']
})
export class MatchTimelineComponent implements OnInit, OnChanges {

  @Input() match: Match = new Match();

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
            [ 'Match',  'Match Start',   '<html><b>Hola</b></html>', new Date(0, 0, 0, 12, 0, 0),  new Date(0, 0, 0, 12, 2, 0) ],
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
    this.setTimelineData();
  }

  ngOnChanges() {
  }

  getMatchPartsRows(): Object[] {
      let toReturn: Object[][] = [];
      toReturn.push([{type: 'string', id: 'Match Part'},  {type: 'string', id: 'Event'}, { type: 'date', id: 'Start Time' }, { type: 'date', id: 'End Time' }])
      if (this.match && this.match.matchParts) {
        this.match.matchParts.forEach((matchPart, i) => {
            const row: Object[] = ['Match',  i+1 + ' Part',
                new Date(0, 0, 0, matchPart.startingTime.getHours(), matchPart.startingTime.getMinutes(), 0),
                new Date(0, 0, 0, matchPart.endingTime.getHours(), matchPart.endingTime.getMinutes(), 0)];
            toReturn.push(row)
        })
      }
      return toReturn;
  }

  private setTimelineData() {
      if (!this.dataForTimeline) {
        this.dataForTimeline = {
            chartType: 'Timeline',
            dataTable:
                this.getMatchPartsRows(),
            options: {},
        };
      }
      return this.dataForTimeline;
  }

  addRow(): void {
      // this.pieChartData.dataTable.push(row);
      this.pieChartData = this.pieChartData2;
      // this.rows.push(row);
      // console.log(this.rows);
  }

  isReady(): boolean {
    return this.dataForTimeline != null;
  }

}
