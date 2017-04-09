/**
 * Created by Manuel on 2017/04/09.
 */
import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {TeamService} from "../../../../services/team.service";
import {TeamSearchService} from "../../../../services/team-search.service";
import {RouterUtilsService} from "../../../../services/router-utils.service";
import {PlayerToTeam} from "../../../../player-to-team";
import {Message} from "primeng/primeng";
import {Page} from "../../../../page";
import {PlayerService} from "../../../../services/player.service";
import {Team} from "../../../../team";



@Component({
    selector: '[app-my-player-history-table-row]',
    templateUrl: 'my-player-history-table-row.component.html',
    styleUrls: [ 'my-player-history-table-row.component.scss' ],
    providers: [ TeamService, TeamSearchService, RouterUtilsService ]
})
export class MyPlayerHistoryTableRowComponent implements OnInit, OnChanges {

    private playerToTeamValue: PlayerToTeam;
    @Output() playerToTeamChange: EventEmitter<PlayerToTeam> = new EventEmitter<PlayerToTeam>();
    isBusy: boolean = true;
    model: PlayerHistoryEntry;
    msgs: Message[] = [];

    teams: Observable<Page<Team>>;
    private searchTerms = new Subject<string>();

    constructor(
        private playerService: PlayerService,
        private teamService: TeamService,
        private teamSearchService: TeamSearchService,
        private routerUtilsService: RouterUtilsService,
    ) {}

    ngOnInit(): void {
        this.createPlayerHistoryEntry();

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

    ngOnChanges() {
        this.createPlayerHistoryEntry();
    }

    createPlayerHistoryEntry(): void {
        this.teamService.getTeam(this.playerToTeamValue.teamId).then(team => {
          this.model = {team: team, playerHistory: this.playerToTeamValue, stillActive: !this.playerToTeamValue.toDate, entryChecked: true};
          this.isBusy = false;
          console.log("model", this.model)
        });
    }

    @Input()
    get playerToTeam(): PlayerToTeam {
        return this.playerToTeamValue;
    }

    set playerToTeam(val: PlayerToTeam) {
        this.playerToTeamValue = val;
        this.playerToTeamChange.emit(this.playerToTeamValue);
    }

    isEntryChecked(): boolean {
        return this.model.entryChecked;
    }

    isStillActive(): boolean {
        return this.model.stillActive;
    }

    changeIsStillActive(): void {
        this.model.stillActive = !this.model.stillActive;
    }

    checkEntry(): void {
        if (this.isEntryValid()) {
            this.playerService.savePlayerToTeam(this.model.playerHistory).then(playerToTeamSaved => {
                this.playerToTeamValue = playerToTeamSaved;
                this.model.playerHistory = playerToTeamSaved;
                this.showEntrySubmitted();
                this.model.entryChecked = true;
            }).catch(error => console.log(error));

        }
    }

    editEntry(): void {
        this.model.entryChecked = false;
    }

    isEntryValid(): boolean {
        let teamExists: boolean = this.model.team != null;
        let hasFromDate: boolean = this.model.playerHistory.fromDate != null;
        let hasToDate: boolean = this.model.stillActive ? true : this.model.playerHistory.toDate != null;
        // check duplicated
        return teamExists && hasFromDate && (this.isStillActive() || (hasToDate && this.model.playerHistory.fromDate < this.model.playerHistory.toDate) );
    }

    removeEntry(): void {
        if (this.model.playerHistory.id) {
            this.playerService.deletePlayerToTeam(this.model.playerHistory).then(result => {
                this.playerToTeamValue == null;
                this.model = null;
                this.showEntryDeleted();
            }).catch(error => {

            })
        } else {
            this.model = null;
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

    getMinDateForFromDate(): Date {
        if (this.model.team) {
            return this.model.team.fromDate;
        } else {
            return new Date(-2208992400)
        }
    }

    getMinDateForToDate(): Date {
        return this.model.playerHistory.fromDate ? this.model.playerHistory.fromDate : this.getMinDateForFromDate();
    }


    selectTeam(team: Team): void {
        this.model.team = team;
        this.model.playerHistory.teamId = team.id;
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
