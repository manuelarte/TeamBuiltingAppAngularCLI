import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-timeline',
  templateUrl: './match-timeline.component.html',
  styleUrls: ['./match-timeline.component.scss']
})
export class MatchTimelineComponent implements OnInit {

  pie_ChartOptions = {
  };

  constructor() { }

  ngOnInit() {
  }

  getTimelineData() {
    const rows = [];
    rows.push(
      [ 'Magnolia Room',  'CSS Fundamentals',    new Date(0, 0, 0, 12, 0, 0),  new Date(0, 0, 0, 14, 0, 0) ],
      [ 'Magnolia Room',  'Intro JavaScript',    new Date(0, 0, 0, 14, 30, 0), new Date(0, 0, 0, 16, 0, 0) ],
      [ 'Magnolia Room',  'Advanced JavaScript', new Date(0, 0, 0, 16, 30, 0), new Date(0, 0, 0, 19, 0, 0) ],
      [ 'Gladiolus Room', 'Intermediate Perl',   new Date(0, 0, 0, 12, 30, 0), new Date(0, 0, 0, 14, 0, 0) ],
      [ 'Gladiolus Room', 'Advanced Perl',       new Date(0, 0, 0, 14, 30, 0), new Date(0, 0, 0, 16, 0, 0) ],
      [ 'Gladiolus Room', 'Applied Perl',        new Date(0, 0, 0, 16, 30, 0), new Date(0, 0, 0, 18, 0, 0) ],
      [ 'Petunia Room',   'Google Charts',       new Date(0, 0, 0, 12, 30, 0), new Date(0, 0, 0, 14, 0, 0) ],
      [ 'Petunia Room',   'Closure',             new Date(0, 0, 0, 14, 30, 0), new Date(0, 0, 0, 16, 0, 0) ],
      [ 'Petunia Room',   'App Engine',          new Date(0, 0, 0, 16, 30, 0), new Date(0, 0, 0, 18, 30, 0) ]

    );
    return rows;
  }

}
