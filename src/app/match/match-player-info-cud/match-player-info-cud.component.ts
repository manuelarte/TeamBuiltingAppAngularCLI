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
  providers: [PlayerSearchService, UtilsService]
})
export class MatchPlayerInfoCudComponent implements OnInit {

    playerRegistered = true;

    @Output() newPlayerInfo: EventEmitter<PlayerInfo> = new EventEmitter<PlayerInfo>();

    constructor(private playerSearchService: PlayerSearchService, private utils: UtilsService) { }

    ngOnInit() {

    }

}
