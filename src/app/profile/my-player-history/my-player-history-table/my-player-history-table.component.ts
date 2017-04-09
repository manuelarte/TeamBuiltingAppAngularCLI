/**
 * Created by Manuel on 22/11/2016.
 */
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {PlayerToTeam} from "../../../player-to-team";
import {Player} from "../../../player";
import {Message} from "primeng/primeng";
import {PlayerService} from "../../../services/player.service";


@Component({
    selector: 'my-player-history-table',
    templateUrl: 'my-player-history-table.component.html',
    styleUrls: [ 'my-player-history-table.component.scss' ],
    providers: []
})
export class MyPlayerHistoryTableComponent implements OnInit {

    @Input() private player: Player;
    private playerHistoryValue: PlayerToTeam[];
    @Output() playerHistoryChange: EventEmitter<PlayerToTeam[]> = new EventEmitter<PlayerToTeam[]>();
    msgs: Message[] = [];


    constructor(
        private playerService: PlayerService
    ) {}

    ngOnInit(): void {
    }

    @Input()
    get playerHistory(): PlayerToTeam[] {
        return this.playerHistoryValue;
    }

    set playerHistory(val: PlayerToTeam[]) {
        this.playerHistoryValue = val.filter(entry => entry != null);
        this.playerHistoryChange.emit(this.playerHistoryValue);
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

    createNewEntry() {
        let playerToTeam: PlayerToTeam = new PlayerToTeam();
        playerToTeam.playerId = this.player.id;
        playerToTeam.fromDate = new Date();
        this.playerHistoryValue.push(playerToTeam);
    }

}
