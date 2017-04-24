import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {PlayerSearchService} from '../../services/player-search.service';
import {Player} from '../../player';
import {Page} from '../../page';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'player-search',
  templateUrl: 'player-search.component.html',
  styleUrls: [ 'player-search.component.scss' ],
  providers: [PlayerSearchService]
})
export class PlayerSearchComponent implements OnInit {
    playersPage: Observable<Page<Player>>;
    private searchTerms = new Subject<string>();

    @Output() playerClicked: EventEmitter<Player> = new EventEmitter<Player>();

    constructor(private playerSearchService: PlayerSearchService) {
    }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        const defaultPage: Page<Player> = new Page<Player>();
        this.playersPage = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
                // return the http search observable
                ? this.playerSearchService.search(term)
                // or the observable of empty heroes if no search term
                : Observable.of<Page<Player>>(defaultPage))
            .catch(error => {
                // TODO: real error handling
                return Observable.of<Page<Player>>(defaultPage);
            });
    }

    onPlayerClicked(player: Player): void {
        this.playerClicked.emit(player);
    }
}
