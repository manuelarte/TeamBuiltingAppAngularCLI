import { Injectable } from '@angular/core';
import {DisplayablePlayerInfo, PlayerInfo, RegisteredPlayerInfo, UnRegisteredPlayerInfo} from './match/playerInfo';
import {Observable} from 'rxjs/Observable';
import {UtilsService} from './services/utils.service';
import {PlayerService} from './services/player.service';
import {Player} from './player';

@Injectable()
export class PlayerInfoUtilService {

  constructor(private playerService: PlayerService, private utilsService: UtilsService) { }

  getDisplayablePlayerInfo(playerInfo: PlayerInfo): Observable<DisplayablePlayerInfo> {
      if (this.utilsService.isRegisteredPlayer(playerInfo)) {
          // get the player details
          const registeredPlayerInfo: RegisteredPlayerInfo = <RegisteredPlayerInfo> playerInfo;
          return this.playerService.getPlayerObservable(registeredPlayerInfo.playerId).map(player => this.convertToDisplayablePlayer(player))
      } else {
          const unregisteredPlayerInfo: UnRegisteredPlayerInfo = <UnRegisteredPlayerInfo> playerInfo;
          const displayablePlayerInfo = new DisplayablePlayerInfo();
          displayablePlayerInfo.name = unregisteredPlayerInfo.name;
          return Observable.of(displayablePlayerInfo);
      }
  }

  private convertToDisplayablePlayer(player: Player): DisplayablePlayerInfo {
    const toReturn: DisplayablePlayerInfo = new DisplayablePlayerInfo();
    toReturn.name = player.name;
    toReturn.nickname = player.nickname;
    toReturn.picture = player.imageLink;
    return toReturn;
  }

}
