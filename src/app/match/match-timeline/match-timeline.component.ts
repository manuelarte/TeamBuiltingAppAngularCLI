import {Component, Input, OnInit} from '@angular/core';
import {MatchEvent} from '../match-events';

@Component({
  selector: 'app-match-timeline',
  templateUrl: './match-timeline.component.html',
  styleUrls: ['./match-timeline.component.scss']
})
export class MatchTimelineComponent implements OnInit {

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

  @Input() events: MatchEvent[] = [];

  constructor() { }

  ngOnInit() {
  }

  getTimelineData() {
    return this.pieChartData;
  }

  addRow(): void {
      // this.pieChartData.dataTable.push(row);
      this.pieChartData = this.pieChartData2;
      // this.rows.push(row);
      // console.log(this.rows);
  }

}
