import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import {TeamSearchService} from "../../services/team-search.service";
import {Team} from "../../team";
import {Page} from "../../page";

@Component({
  selector: 'team-search',
  templateUrl: 'team-search.component.html',
  styleUrls: [ 'team-search.component.scss' ],
  providers: [TeamSearchService]
})
export class TeamSearchComponent implements OnInit {
  teamsPage: Observable<Page<Team>>;
  private searchTerms = new Subject<string>();

  @Output() teamClicked: EventEmitter<Team> = new EventEmitter<Team>();

  constructor(
    private teamSearchService: TeamSearchService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    let defaultPage: Page<Team> = new Page<Team>();
    this.teamsPage = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.teamSearchService.search(term)
        // or the observable of empty heroes if no search term
        : Observable.of<Page<Team>>(defaultPage))
      .catch(error => {
        // TODO: real error handling
        return Observable.of<Page<Team>>(defaultPage);
      });
  }

  onTeamClicked(team: Team): void {
    this.teamClicked.emit(team);
  }

}
