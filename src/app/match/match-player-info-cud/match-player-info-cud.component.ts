import {Component, Input, OnInit} from '@angular/core';
import {PlayerInfo, RegisteredPlayerInfo} from '../playerInfo';
import {Player} from '../../player';
import {PlayerService} from '../../services/player.service';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-match-player-info-cud',
  templateUrl: './match-player-info-cud.component.html',
  styleUrls: ['./match-player-info-cud.component.scss'],
  providers: [PlayerService, UtilsService]
})
export class MatchPlayerInfoCudComponent implements OnInit {

    @Input() playerInfo: PlayerInfo;
    registeredPlayerInfo = false;

    player: Player;

    isBusy = false;
    errorOccurred = false;

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
        }
    }

}
