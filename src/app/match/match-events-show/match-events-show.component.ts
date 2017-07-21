import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MatchEvent, MatchEventSchemaAndUi} from '../match-events';
import {Match} from '../match';
import {MatchService} from '../../services/match.service';
import moment = require('moment');
import {DataSource} from '@angular/cdk';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MatchUtilsService} from '../../services/match-utils.service';

@Component({
  selector: 'app-match-events-show',
  templateUrl: './match-events-show.component.html',
  styleUrls: ['./match-events-show.component.scss'],
  providers: [MatchService, MatchUtilsService]
})
export class MatchEventsShowComponent implements OnInit, OnChanges {

  @Input() match: Match;
  @Input() matchEvents: MatchEvent[] = [];
  @Input() eventToDisplay$: Observable<any>;
  @Input() private editable = true;

  loadingSchemaAndUiMatchEvents = false;
  errorLoadingSchemaAndUiMatchEvents = false;
  schemaAndUiMatchEvents: MatchEventSchemaAndUi;

  // table
  displayedColumns: string[] = ['type', 'when', 'info', 'actions'];
  dataSource: ExampleDataSource | null;

  @ViewChild('filter') filter: ElementRef;
  // /table

  constructor(private matchService: MatchService, private matchUtilsService: MatchUtilsService) { }

  ngOnInit() {
    this.loadingSchemaAndUiMatchEvents = true;
    this.matchService.getMatchEvents().then(schemaAndUiMatchEvents => {
      console.log(schemaAndUiMatchEvents)
      this.schemaAndUiMatchEvents = schemaAndUiMatchEvents;
      this.loadingSchemaAndUiMatchEvents = false;

    });
    if (this.eventToDisplay$) {
      this.eventToDisplay$.subscribe(() => this.ngOnChanges())
    }

  }

  ngOnChanges(...args: any[]) {
    // table
    this.dataSource = new ExampleDataSource(this.matchEvents);
      if (this.filter){
          Observable.fromEvent(this.filter.nativeElement, 'keyup')
              .debounceTime(150)
              .distinctUntilChanged()
              .subscribe(() => {
                if (!this.dataSource) { return; }
                this.dataSource.filter = this.filter.nativeElement.value;
          });
      }
    // /table
  }

  isEditable(): boolean {
    return this.editable
  }

  getEventType(matchEvent: MatchEvent): string {
    return this.matchUtilsService.getMatchEventType(matchEvent);
  }

  getTableProperties(matchEvent: MatchEvent): string[] {
    return this.schemaAndUiMatchEvents[this.getEventType(matchEvent)].ui.tableProperties;
  }

  getWhenInMinutes(matchEvent: MatchEvent): number {
    return moment(this.matchUtilsService.getMatchParts(this.match)[0].startingTime).subtract( new Date(matchEvent[this.getEventType(matchEvent)].when).getTime() ).get('minutes');
  }

  getSchemaAndWidget(matchEvent: MatchEvent, property: string): any {
    const schemaAndWidget: any = this.schemaAndUiMatchEvents[this.getEventType(matchEvent)].schema.properties[property];
    schemaAndWidget.readOnly = true;
    schemaAndWidget.widget = this.schemaAndUiMatchEvents[this.getEventType(matchEvent)].ui.properties[property].widget;
    schemaAndWidget.widget.match = this.match;
    return schemaAndWidget;
  }

}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<MatchEvent> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }

    constructor(private matchEvents: MatchEvent[]) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<MatchEvent[]> {
        const displayDataChanges: [MatchEvent[], any] = [
            this.matchEvents,
            this._filterChange,
        ];
        console.log('displayDataChanges:', displayDataChanges)
        return Observable.merge(...displayDataChanges).map(() => {
            return this.matchEvents.slice().filter((item: MatchEvent) => {
                console.log('item?:', item);
                const type: string = Object.keys(item)[0];
                let searchStr = (type + item[type].when).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) != -1;
            });
        });
    }

    disconnect() {}

}
