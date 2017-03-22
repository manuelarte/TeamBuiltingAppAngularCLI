/**
 * Created by Manuel on 22/11/2016.
 */
import {Component, OnInit, Input, OnChanges, SimpleChanges}      from '@angular/core';
import {SelectItem} from "primeng/primeng";
import {Message} from "primeng/primeng";
import {PlayerService} from "../../services/player.service";
import {TeamSportService} from "../../services/sports-service";
import {Player} from "../../player";
import {TeamSportPosition} from "../../team-sports";
import {PlayerToTeamSportDetails} from "../../player-to-team-sport-details";

@Component({
    selector: 'my-player-position',
    templateUrl: 'my-player-position.component.html',
    providers: [ PlayerService, TeamSportService ]
})
export class MyPlayerPositionComponent implements OnInit, OnChanges  {

    @Input() private player: Player;

    dictModel: {[sport: string]: PlayerToTeamSportDetailEntry} = {};
    sportPositions: {[id: string]: TeamSportPosition[]} = {};
    sportPositionsLoaded = false;
    msgs: Message[] = [];

    constructor(
        private playerService: PlayerService,
        private teamSportService: TeamSportService,
    ) {}

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {
        this.playerService.getPlayerToTeamSportDetails(this.player.id).then(result => {
            result.forEach(entry =>  this.dictModel[entry.sport] = {playerToTeamSportDetail: entry, entryChecked: true})
        });

        this.teamSportService.getTeamSportsAvailable().then(sports => {
            sports.forEach(sportPojo => this.teamSportService.getTeamSportPositions(sportPojo.name).then(sportPositions => {
                this.sportPositions[sportPojo.name] = sportPositions;
                this.sportPositionsLoaded = true;
            }));
        })
    }

    getSportPositions(sport: string): any {
        return this.sportPositions[sport];
    }

    getSpareSportPositions(sport: string): SelectItem[] {
        let toReturn: SelectItem[] = [];
        let mainPosition = this.dictModel[sport].playerToTeamSportDetail.mainPosition;
        if (this.sportPositions[sport]) {
            let rest = this.sportPositions[sport].filter(sportPosition => sportPosition.abbreviation != mainPosition);
            rest.forEach(entry => toReturn.push({label: entry.fullName, value: entry.abbreviation}));
        }
        return toReturn;
    }

    keys() : Array<string> {
        return Object.keys(this.dictModel).filter(sport => this.dictModel[sport] != null);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    isEntryChecked(sport: string): boolean {
        return this.dictModel[sport].entryChecked
    }

    editEntry(sport: string): void {
        this.dictModel[sport].entryChecked = false;
    }

    checkEntry(sport: string): void {
        this.playerService.savePlayerToTeamSportDetails(this.dictModel[sport].playerToTeamSportDetail).then(saved => {
            this.dictModel[sport].playerToTeamSportDetail = saved;
            this.dictModel[sport].entryChecked = true;
            this.showEntrySubmittedMessage();
        })
    }

    removeEntry(sport: string): void {
        if (this.dictModel[sport].playerToTeamSportDetail.id) {
            this.playerService.deletePlayerToTeamSportDetails(this.dictModel[sport].playerToTeamSportDetail).then(result => {
                this.dictModel[sport] = null;
                this.showEntryDeletedMessage();
            }).catch()
        } else {
            this.dictModel[sport] = null;
        }
    }

    isEntryValid(sport: string): boolean {
        // check that main position exists
        let mainPositionExists: boolean = this.dictModel[sport] ? this.dictModel[sport].playerToTeamSportDetail.mainPosition != null : false;
        // check that the other positions does not contain the main position
        let mainPositionNotInOtherPositions = this.dictModel[sport].playerToTeamSportDetail.otherPositions ? this.dictModel[sport].playerToTeamSportDetail.otherPositions.filter(position => position === this.dictModel[sport].playerToTeamSportDetail.mainPosition).length === 0 : true;
        return mainPositionExists && mainPositionNotInOtherPositions;
    }

    allSportsAreDetailed(): boolean {
        return Object.keys(this.sportPositions).filter(sport => !this.dictModel[sport]).length == 0;
    }

    sportsNotChecked(): string[] {
        return Object.keys(this.sportPositions).filter(sport => !this.dictModel[sport]);
    }

    addNewEntry(sport: string): void {
        let entry = new PlayerToTeamSportDetails();
        entry.playerId = this.player.id;
        entry.sport = sport;
        this.dictModel[sport] = {playerToTeamSportDetail: entry, entryChecked: false}
    }

    private showEntryDeletedMessage(): void {
        this.msgs = [];
        this.msgs.push(this.showMessageInEntry('Success', 'Entry deleted', ''));
    }

    private showEntrySubmittedMessage(): void {
        this.msgs = [];
        this.msgs.push(this.showMessageInEntry('Success','Entry submitted', ''));
    }

    private showMessageInEntry(severity: string, summary: string, detail: string): any {
        return {severity: severity, summary: summary, detail: detail}
    }
}

class PlayerToTeamSportDetailEntry {
    playerToTeamSportDetail: PlayerToTeamSportDetails;
    entryChecked: boolean;
}
