import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlayerInfo, RegisteredPlayerInfo, UnRegisteredPlayerInfo} from '../playerInfo';
import {Player} from '../../player';
import {PlayerService} from '../../services/player.service';
import {UtilsService} from '../../services/utils.service';
import {PlayerSearchService} from "../../services/player-search.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-match-player-info-cud',
  templateUrl: './match-player-info-cud.component.html',
  styleUrls: ['./match-player-info-cud.component.scss'],
  providers: [UtilsService]
})
export class MatchPlayerInfoCudComponent implements OnInit {

    playerRegistered = true;
    playerInfo: PlayerInfo;
    player: Player;

    @Output() newPlayerInfo: EventEmitter<PlayerInfo> = new EventEmitter<PlayerInfo>();

    unregisteredPlayerInfoForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        // imageLink: new FormControl('', [ Validators.required, Validators.minLength(6)]),
    });

    name: string;

    @Input() playersFilter: (player: Player) => boolean = player => true;

    constructor() { }

    ngOnInit() {
        // TODO do not forget to filter the players that are already in the game
    }

    createPlayerInfoFrom(player: Player): PlayerInfo {
        this.player = player;
        const registeredPlayerInfo = new RegisteredPlayerInfo();
        registeredPlayerInfo.id = UUID.UUID();
        registeredPlayerInfo.playerId = player.id;
        return registeredPlayerInfo;
    }

    createPlayerInfoFromForm(): PlayerInfo {
        const unRegisteredPlayerInfo = new UnRegisteredPlayerInfo();
        unRegisteredPlayerInfo.id = UUID.UUID();
        unRegisteredPlayerInfo.name = this.name;
        return unRegisteredPlayerInfo;
    }

    isValid(): boolean {
        return this.playerRegistered ? this.isValidRegisteredPlayerInfo() : this.isValidUnRegisteredPlayerInfo();
    }

    addPlayerInfoToMatch(): void {
        if (this.playerRegistered) {
            this.newPlayerInfo.emit(this.playerInfo);
        } else {
            this.newPlayerInfo.emit(this.createPlayerInfoFromForm());
        }
        this.clear();
    }

    clear() {
        this.playerInfo = null;
        this.player = null;
        this.playerRegistered = true;
        this.name = null;
    }

    private isValidRegisteredPlayerInfo(): boolean {
        return this.playerInfo != null;
    }

    private isValidUnRegisteredPlayerInfo(): boolean {
        return this.unregisteredPlayerInfoForm.valid;
    }

}
