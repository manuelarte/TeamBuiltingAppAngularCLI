import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {PlayerSearchService} from '../../services/player-search.service';
import {Player} from '../../player';
import {Page} from '../../page';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'player-search',
  templateUrl: 'player-search.component.html',
  styleUrls: [ 'player-search.component.scss' ],
  providers: [PlayerSearchService]
})
export class PlayerSearchComponent implements OnInit {
    @Input() disabled = false;
    myControl = new FormControl({value: '', disabled: this.disabled});
    playersPage: Observable<Page<Player>>;
    private searchTerms: Subject<string> = new Subject<string>();

    @Output() playerClicked: EventEmitter<Player> = new EventEmitter<Player>();

    @Input() playersFilter: (player: Player) => boolean = player => true;

    constructor(private playerSearchService: PlayerSearchService) {
    }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        const defaultPage: Page<Player> = new Page<Player>();
        this.playersPage = this.myControl.valueChanges
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
                // return the http search observable
                ? this.playerSearchService.search(term)
                // or the observable of empty players if no search term
                : Observable.of<Page<Player>>(defaultPage))
            .catch(error => {
                // TODO: real error handling
                return Observable.of<Page<Player>>(defaultPage);
            });
    }

    onPlayerClicked(player: Player): void {
        this.playerClicked.emit(player);
    }

    isDisabled(player: Player): boolean {
      return !this.playersFilter(player);
    }
}
