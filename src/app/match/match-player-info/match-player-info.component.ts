import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from '../../player';
import {PlayerService} from '../../services/player.service';
import {UtilsService} from '../../services/utils.service';
import {DisplayablePlayerInfo, PlayerInfo, RegisteredPlayerInfo, UnRegisteredPlayerInfo} from '../playerInfo';
import {MatchFeedback} from '../../match-feedback/match-feedback';
import {PlayerInfoUtilService} from '../../player-info-util.service';

@Component({
  selector: 'app-match-player-info',
  templateUrl: './match-player-info.component.html',
  styleUrls: ['./match-player-info.component.scss'],
  providers: []
})
export class MatchPlayerInfoComponent implements OnInit {

    @Input() playerInfo: PlayerInfo;
    @Input() private editable = true;
    @Input() matchFeedback: MatchFeedback[] = [];

    player: DisplayablePlayerInfo;

    isBusy = false;
    errorOccurred = false;

    @Output() playerRemoved: EventEmitter<PlayerInfo> = new EventEmitter<PlayerInfo>();

    constructor(private playerInfoUtilService: PlayerInfoUtilService) { }

    ngOnInit() {
      if (this.playerInfo) {
        this.playerInfoUtilService.getDisplayablePlayerInfo(this.playerInfo).subscribe(displayablePlayer => this.player = displayablePlayer)
      }
    }

    isEditable(): boolean {
        return this.editable;
    }

    removePlayerFromMatch(): void {
        console.log("Removing player", this.playerInfo);
        this.playerRemoved.emit(this.playerInfo);
    }

}
