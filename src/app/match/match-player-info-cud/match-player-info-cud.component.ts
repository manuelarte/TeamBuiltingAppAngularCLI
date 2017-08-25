import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlayerInfo, RegisteredPlayerInfo, UnRegisteredPlayerInfo} from '../playerInfo';
import {Player} from '../../player';
import {UtilsService} from '../../services/utils.service';
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

    /**
     * Holder for the player when PlayerInfo is made for a registered player
     */
    player: Player;
    unregisteredPlayerInfo: UnRegisteredPlayerInfo = new UnRegisteredPlayerInfo();

    unregisteredPlayerInfoForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        // imageLink: new FormControl('', [ Validators.required, Validators.minLength(6)]),
    });

    @Output() newPlayerInfo: EventEmitter<PlayerInfo> = new EventEmitter<PlayerInfo>();

    @Input() playersFilter: (player: Player) => boolean = player => true;

    constructor() { }

    ngOnInit() {
        // TODO do not forget to filter the players that are already in the match
    }

    createPlayerInfoFrom(player: Player): PlayerInfo {
        this.player = player;
        const registeredPlayerInfo = new RegisteredPlayerInfo();
        registeredPlayerInfo.id = UUID.UUID();
        registeredPlayerInfo.playerId = player.id;
        return registeredPlayerInfo;
    }

    createPlayerInfoFromForm(): PlayerInfo {
        this.unregisteredPlayerInfo.id = UUID.UUID();
        return this.unregisteredPlayerInfo;
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
        this.unregisteredPlayerInfo = new UnRegisteredPlayerInfo();
    }

    private isValidRegisteredPlayerInfo(): boolean {
        return this.playerInfo != null;
    }

    private isValidUnRegisteredPlayerInfo(): boolean {
        return this.unregisteredPlayerInfoForm.valid;
    }

}
