import {Component, OnInit, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Message} from "primeng/primeng";
import {Player} from "../../player";
import {Auth} from "../../services/auth-service";
import {PlayerService} from "../../services/player.service";
import {PlayerToTeam} from "../../player-to-team";

@Component({
  selector: 'my-player-history',
  styleUrls: ['my-player-history.component.scss'],
  templateUrl: 'my-player-history.component.html',
  providers: [ Auth, PlayerService ],
})
export class MyPlayerHistoryComponent implements OnInit, OnChanges  {

    @Input() player: Player = new Player();
    playerHistory: PlayerToTeam[] = [];

    playerHistorySavedMessage: Message[] = [];
    private playerHistoryLoaded: boolean = false;

    constructor(private auth: Auth, private playerService: PlayerService) {}

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.player) {
            this.playerService.getPlayerHistory(this.player.id).then(playerHistory => {
                console.log("loading player history for ", this.player)
                this.playerHistory = playerHistory;
                this.playerHistoryLoaded = true;
            }).catch()
        }
    }


    isPlayerHistoryLoaded(): boolean {
        return this.playerHistoryLoaded;
    }

    private showSuccessMessage(detailedMessage: string): void {
        this.playerHistorySavedMessage = [];
        this.playerHistorySavedMessage.push({severity:'success', summary:'Success', detail: detailedMessage});
    }

    private showFailMessage(error, detailedMessage): void {
        this.playerHistorySavedMessage = [];
        this.playerHistorySavedMessage.push({severity:'error', summary:'Failed', detail: detailedMessage});
    }

    selectTeam(teamId: string) {
        console.log("Go to team!")
    }

    onTabSelected(event) {

    }

    onTabIndexChanged(event) {

    }

    onTabContentActivated(event) {

    }

    private handleError(error: any) {
        console.error("The error:", error)
    }

    noEntries(): boolean {
        return this.playerHistory.length == 0;
    }

}
