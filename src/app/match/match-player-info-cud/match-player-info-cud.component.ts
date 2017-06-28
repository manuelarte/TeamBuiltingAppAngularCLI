import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlayerInfo, RegisteredPlayerInfo} from '../playerInfo';
import {Player} from '../../player';
import {PlayerService} from '../../services/player.service';
import {UtilsService} from '../../services/utils.service';
import {PlayerSearchService} from "../../services/player-search.service";

@Component({
  selector: 'app-match-player-info-cud',
  templateUrl: './match-player-info-cud.component.html',
  styleUrls: ['./match-player-info-cud.component.scss'],
  providers: [UtilsService]
})
export class MatchPlayerInfoCudComponent implements OnInit {

    playerRegistered = true;
    playerInfo: PlayerInfo;

    @Output() newPlayerInfo: EventEmitter<PlayerInfo> = new EventEmitter<PlayerInfo>();

    constructor(private utils: UtilsService) { }

    ngOnInit() {
        // TODO do not forget to filter the players that are already in the game
    }

    createPlayerInfoFrom(player: Player): PlayerInfo {
        const registeredPlayerInfo = new RegisteredPlayerInfo();
        registeredPlayerInfo.playerId = player.id;
        return registeredPlayerInfo;
    }

}
