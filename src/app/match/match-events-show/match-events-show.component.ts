import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {GoalMatchEvent, MatchEvent} from '../match-events';
import {Match} from '../match';
import {MatchService} from '../../services/match.service';
import moment = require('moment');
import {DataSource} from '@angular/cdk';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-match-events-show',
  templateUrl: './match-events-show.component.html',
  styleUrls: ['./match-events-show.component.scss'],
  providers: []
})
export class MatchEventsShowComponent implements OnInit {

  @Input() matchEvents: MatchEvent[] = [];

  // table
  displayedColumns: string[] = ['type', 'when'];
  dataSource: ExampleDataSource | null;

  @ViewChild('filter') filter: ElementRef;
  // /table

  constructor() { }

  ngOnInit() {
    const test: GoalMatchEvent = new GoalMatchEvent();
    test.goal = {
      when: new Date(),
      who: 'Me',
      teamThatScored: 'Me',
      description: 'A beautiful goal'
    };
    this.matchEvents.push(test);

    // table
    this.dataSource = new ExampleDataSource(this.matchEvents);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
         if (!this.dataSource) { return; }
           this.dataSource.filter = this.filter.nativeElement.value;
      });
    // /table

  }

};

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<DisplayableEvent> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }

    constructor(private matchEvents: MatchEvent[]) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<DisplayableEvent[]> {
        const displayDataChanges: [DisplayableEvent[], any] = [
            this.matchEvents.map(this.convert),
            this._filterChange,
        ];
        console.log('displayDataChanges:', displayDataChanges)
        return Observable.merge(...displayDataChanges).map(() => {
            return this.matchEvents.slice().map(this.convert).filter((item: DisplayableEvent) => {
                console.log('item?:', item);
                let searchStr = (item.type + item.when).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) != -1;
            });
        });
    }

    disconnect() {}

    private convert(matchEvent: MatchEvent): DisplayableEvent {
        const d: DisplayableEvent = new DisplayableEvent();
        d.type = Object.keys(matchEvent)[0];
        d.when = matchEvent[Object.keys(matchEvent)[0]].when;
        return d;
    }
}

class DisplayableEvent {
    type: string;
    when: number;
}
