import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-timeline',
  templateUrl: './match-timeline.component.html',
  styleUrls: ['./match-timeline.component.scss']
})
export class MatchTimelineComponent implements OnInit {

  private pieChartData =  {
        chartType: 'Timeline',
        dataTable: [
            [ 'Magnolia Room',  'CSS Fundamentals',    new Date(0, 0, 0, 12, 0, 0),  new Date(0, 0, 0, 14, 0, 0) ],
            [ 'Magnolia Room',  'Intro JavaScript',    new Date(0, 0, 0, 14, 30, 0), new Date(0, 0, 0, 16, 0, 0) ],
            [ 'Magnolia Room',  'Advanced JavaScript', new Date(0, 0, 0, 16, 30, 0), new Date(0, 0, 0, 19, 0, 0) ],
            [ 'Gladiolus Room', 'Intermediate Perl',   new Date(0, 0, 0, 12, 30, 0), new Date(0, 0, 0, 14, 0, 0) ],
            [ 'Gladiolus Room', 'Advanced Perl',       new Date(0, 0, 0, 14, 30, 0), new Date(0, 0, 0, 16, 0, 0) ],
            [ 'Gladiolus Room', 'Applied Perl',        new Date(0, 0, 0, 16, 30, 0), new Date(0, 0, 0, 18, 0, 0) ],
            [ 'Petunia Room',   'Google Charts',       new Date(0, 0, 0, 12, 30, 0), new Date(0, 0, 0, 14, 0, 0) ],
            [ 'Petunia Room',   'Closure',             new Date(0, 0, 0, 14, 30, 0), new Date(0, 0, 0, 16, 0, 0) ],
        ],
        options: {},
  };

    private pieChartData2 =  {
        chartType: 'Timeline',
        dataTable: [
            [ 'Magnolia Room',  'CSS Fundamentals',    new Date(0, 0, 0, 12, 0, 0),  new Date(0, 0, 0, 14, 0, 0) ],
            [ 'Magnolia Room',  'Intro JavaScript',    new Date(0, 0, 0, 14, 30, 0), new Date(0, 0, 0, 16, 0, 0) ],
            [ 'Magnolia Room',  'Advanced JavaScript', new Date(0, 0, 0, 16, 30, 0), new Date(0, 0, 0, 19, 0, 0) ],
            [ 'Gladiolus Room', 'Intermediate Perl',   new Date(0, 0, 0, 12, 30, 0), new Date(0, 0, 0, 14, 0, 0) ],
            [ 'Gladiolus Room', 'Advanced Perl',       new Date(0, 0, 0, 14, 30, 0), new Date(0, 0, 0, 16, 0, 0) ],
            [ 'Gladiolus Room', 'Applied Perl',        new Date(0, 0, 0, 16, 30, 0), new Date(0, 0, 0, 18, 0, 0) ],
            [ 'Petunia Room',   'Google Charts',       new Date(0, 0, 0, 12, 30, 0), new Date(0, 0, 0, 14, 0, 0) ],
            [ 'Petunia Room',   'Closure',             new Date(0, 0, 0, 14, 30, 0), new Date(0, 0, 0, 16, 0, 0) ],
            [ 'Petunia Room',   'App Engine',          new Date(0, 0, 0, 16, 30, 0), new Date(0, 0, 0, 18, 30, 0) ]
        ],
        options: {},
    };

  constructor() { }

  ngOnInit() {
  }

  getTimelineData() {
    return this.pieChartData;
  }

  addRow(): void {
      const row: any = [ 'Petunia Room',   'App Engine',          new Date(0, 0, 0, 16, 30, 0), new Date(0, 0, 0, 18, 30, 0) ];
      // this.pieChartData.dataTable.push(row);
      this.pieChartData = this.pieChartData2;
      // this.rows.push(row);
      // console.log(this.rows);
  }

}
