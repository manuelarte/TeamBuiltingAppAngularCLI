import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from '../../player';
import {PlayerService} from '../../services/player.service';
import {UtilsService} from '../../services/utils.service';
import {PlayerInfo, RegisteredPlayerInfo, UnRegisteredPlayerInfo} from '../playerInfo';

@Component({
  selector: 'app-match-player-info',
  templateUrl: './match-player-info.component.html',
  styleUrls: ['./match-player-info.component.scss'],
  providers: [PlayerService, UtilsService]
})
export class MatchPlayerInfoComponent implements OnInit {

    @Input() playerInfo: PlayerInfo;
    registeredPlayerInfo = false;

    player: Player;

    isBusy = false;
    errorOccurred = false;

    @Output() playerRemoved: EventEmitter<PlayerInfo> = new EventEmitter<PlayerInfo>();

    constructor(private playerService: PlayerService, private utils: UtilsService) { }

    ngOnInit() {
        this.registeredPlayerInfo = this.playerInfo != null && this.utils.isRegisteredPlayer(this.playerInfo);
        if (this.registeredPlayerInfo) {
            // get the player details
            const registeredPlayerInfo: RegisteredPlayerInfo = <RegisteredPlayerInfo> this.playerInfo;
            this.isBusy = true;
            this.errorOccurred = false;
            this.playerService.getPlayer(registeredPlayerInfo.playerId).then(player => {
                this.player = player;
                this.isBusy = false;
                this.errorOccurred = false;
            }).catch(error => {
                this.isBusy = false;
                this.errorOccurred = true;
            });
        } else {
            const unregisteredPlayerInfo: UnRegisteredPlayerInfo = <UnRegisteredPlayerInfo> this.playerInfo;
            this.player = new Player();
            this.player.name = unregisteredPlayerInfo.name;
        }
    }

    removePlayerFromMatch(): void {
        console.log("Removing player", this.playerInfo);
        this.playerRemoved.emit(this.playerInfo);
    }

}
