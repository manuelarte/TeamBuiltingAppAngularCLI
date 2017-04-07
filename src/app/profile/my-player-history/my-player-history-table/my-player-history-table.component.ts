/**
 * Created by Manuel on 22/11/2016.
 */
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {TeamService} from "../../../services/team.service";
import {TeamSearchService} from "../../../services/team-search.service";
import {PlayerToTeam} from "../../../player-to-team";
import {Player} from "../../../player";
import {Message} from "primeng/primeng";
import {Team} from "../../../team";
import {PlayerService} from "../../../services/player.service";
import {PlayerHistoryUtilsService} from "../../../services/player-history-utils.service";
import {Page} from "../../../page";
import {RouterUtilsService} from "../../../services/router-utils.service";


@Component({
    selector: 'my-player-history-table',
    templateUrl: 'my-player-history-table.component.html',
    styleUrls: [ 'my-player-history-table.component.scss' ],
    providers: [ TeamService, TeamSearchService, PlayerHistoryUtilsService, RouterUtilsService ]
})
export class MyPlayerHistoryTableComponent implements OnInit {

    @Input() private player: Player;
    private playerHistoryValue: PlayerToTeam[];
    @Output() playerHistoryChange: EventEmitter<PlayerToTeam[]> = new EventEmitter<PlayerToTeam[]>();
	isBusy: boolean = true;
    model: PlayerHistoryEntry[] = [];
    msgs: Message[] = [];

    teams: Observable<Page<Team>>;
    private searchTerms = new Subject<string>();

    constructor(
        private playerService: PlayerService,
        private teamService: TeamService,
        private teamSearchService: TeamSearchService,
        private playerHistoryUtilsService: PlayerHistoryUtilsService,
        private routerUtilsService: RouterUtilsService,
    ) {}

    ngOnInit(): void {
        this.model = this.createPlayerHistoryEntry(this.playerHistoryValue);

        this.teams = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
                // return the http search observable
                ? this.teamSearchService.search(term)
                // or the observable of empty heroes if no search term
                : Observable.of<Page<Team>>(new Page<Team>()))
            .catch(error => {
                // TODO: real error handling
                console.log(error);
                return Observable.of<Page<Team>>(new Page<Team>());
            });
    }

    createPlayerHistoryEntry(playerHistory: PlayerToTeam[]): PlayerHistoryEntry[] {
        let model: PlayerHistoryEntry[] = [];
        playerHistory.sort(this.playerHistoryUtilsService.sortByFromDate).forEach(entry => {
            this.teamService.getTeam(entry.teamId).then(team => {
                model.push( {team: team, playerHistory: entry, stillActive: !entry.toDate, entryChecked: true} );
                this.isBusy = false;
            })
        });
        return model;
    }

    @Input()
    get playerHistory(): PlayerToTeam[] {
        return this.playerHistoryValue;
    }

    set playerHistory(val: PlayerToTeam[]) {
        this.playerHistoryValue = val;
        this.playerHistoryChange.emit(this.playerHistoryValue);
        console.log(val)
        this.createPlayerHistoryEntry(val);
    }

    isEntryChecked(index: number): boolean {
        return this.model[index].entryChecked;
    }

    isStillActive(index: number): boolean {
        return this.model[index].stillActive;
    }

    changeIsStillActive(index: number): void {
        this.model[index].stillActive = !this.model[index].stillActive;
    }

    checkEntry(index: number): void {
        if (this.isEntryValid(index)) {
            this.playerService.savePlayerToTeam(this.model[index].playerHistory).then(playerToTeamSaved => {
                this.model[index].playerHistory = playerToTeamSaved;
                this.showEntrySubmitted();
                this.model[index].entryChecked = true;
                this.playerHistoryValue.push(this.model[index].playerHistory);
            }).catch(error => console.log(error));

        }
    }

    editEntry(index: number): void {
        this.model[index].entryChecked = false;
    }

    isEntryValid(index: number): boolean {
        let teamExists: boolean = this.model[index].team != null;
        let hasFromDate: boolean = this.model[index].playerHistory.fromDate != null;
        let hasToDate: boolean = this.model[index].stillActive ? true : this.model[index].playerHistory.toDate != null;
        // check duplicated
        return teamExists && hasFromDate && (this.isStillActive(index) || (hasToDate && this.model[index].playerHistory.fromDate < this.model[index].playerHistory.toDate) );
    }

    removeEntry(index: number): void {
        if (this.model[index].playerHistory.id) {
            this.playerService.deletePlayerToTeam(this.model[index].playerHistory).then(result => {
                this.playerHistoryValue.splice(index);
                this.model.splice(index);
                this.showEntryDeleted();
            }).catch(error => {

            })
        } else {
            this.model.splice(index);
        }
    }

    showEntryDeleted(): void {
        this.msgs = [];
        this.msgs.push(this.showMessageInEntry('Success', 'Entry deleted', ''));
    }

    showEntrySubmitted(): void {
        this.msgs = [];
        this.msgs.push(this.showMessageInEntry('Success','Entry submitted', ''));
    }

    showMessageInEntry(severity: string, summary: string, detail: string): any {
        return {severity: severity, summary: summary, detail: detail}
    }

    getMinDateForFromDate(index: number): Date {
        if (this.model[index].team) {
            return this.model[index].team.fromDate;
        } else {
            return new Date(-2208992400)
        }
    }

    getMinDateForToDate(index: number): Date {
        return this.model[index].playerHistory.fromDate ? this.model[index].playerHistory.fromDate : this.getMinDateForFromDate(index);
    }

    createNewEntry(index: number) {
        let playerToTeam: PlayerToTeam = new PlayerToTeam();
        playerToTeam.playerId = this.player.id;
        playerToTeam.fromDate = new Date();
        let entry: PlayerHistoryEntry = {team: null, entryChecked: false, playerHistory: playerToTeam, stillActive: true};
        this.model.push(entry);
    }

    areAllEntriesChecked(): boolean {
        return this.model.filter(entry => entry.entryChecked == true).length == this.model.length;
    }

    selectTeam(team: Team, index: number): void {
        this.model[index].team = team;
        this.model[index].playerHistory.teamId = team.id;
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

}

class PlayerHistoryEntry {
    team: Team;
    playerHistory: PlayerToTeam;
    stillActive: boolean;
    entryChecked: boolean;
}
