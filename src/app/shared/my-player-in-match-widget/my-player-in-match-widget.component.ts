import {Component, Input, OnInit} from '@angular/core';
import {PlayerInfo, RegisteredPlayerInfo, UnRegisteredPlayerInfo} from '../../match/playerInfo';
import {FormControl} from '@angular/forms';
import {Match} from '../../match/match';
import {UtilsService} from '../../services/utils.service';
import {PlayerService} from '../../services/player.service';

@Component({
  selector: 'app-my-player-in-match-widget',
  templateUrl: './my-player-in-match-widget.component.html',
  styleUrls: ['./my-player-in-match-widget.component.scss'],
  providers: [PlayerService, UtilsService]
})
export class MyPlayerInMatchWidgetComponent implements OnInit {

  @Input() schema: {[key: string]: any, widget: {id: string, match: Match}};
  playersRepresentation: PlayerRepresentation[] = [];
  @Input() control: FormControl = new FormControl();

  isBusy = false;
  isErrorLoading = false;

  constructor(private playerService: PlayerService, private utilsService: UtilsService) { }

  ngOnInit() {
      if (this.playersAreSelected()) {
          const homePlayersSelected: PlayerInfo[] = this.schema.widget.match.homeTeam.selectedPlayers?this.schema.widget.match.homeTeam.selectedPlayers:[];
          const awayPlayersSelected: PlayerInfo[] = this.schema.widget.match.awayTeam.selectedPlayers?this.schema.widget.match.awayTeam.selectedPlayers:[];
          homePlayersSelected.forEach(homePlayer => this.convertPlayerInfoToRepresentation('http://www.devo58.nl/wordpress/wp-content/themes/devo-activello/images/devo58-logo@2x.png', homePlayer));
          awayPlayersSelected.forEach(awayPlayer => this.convertPlayerInfoToRepresentation('http://doestkeepersclass.nl/wp-content/uploads/2016/03/logo_wv-hedw.png', awayPlayer));
      }
  }

  private playersAreSelected(): boolean {
    if (this.schema.widget.match.homeTeam || this.schema.widget.match.awayTeam) {
        return true;
    }
    return false;
  }

  getPlayersRepresentation(): PlayerRepresentation[] {
    return this.playersRepresentation;
  }

  private convertPlayerInfoToRepresentation(teamEmblem: string, playerInfo: PlayerInfo): void {
      const representation = new PlayerRepresentation();
      representation.id = playerInfo.id;
      representation.teamEmblem = teamEmblem;
      if (this.utilsService.isRegisteredPlayer(playerInfo)) {
        const registeredPlayerInfo: RegisteredPlayerInfo = <RegisteredPlayerInfo> playerInfo;
        this.playerService.getPlayer(registeredPlayerInfo.playerId).then(player => {
          representation.name = player.name;
          representation.playerImage = player.imageLink;
          this.playersRepresentation.push(representation);
        });
      } else {
        const unRegisteredPlayerInfo: UnRegisteredPlayerInfo = <UnRegisteredPlayerInfo> playerInfo;
        representation.playerImage = 'http://i.cdn.cnn.com/cnn/.e/interactive/2016/ultimate-footballer-v2/intro1.png';
        representation.name = unRegisteredPlayerInfo.name;
        this.playersRepresentation.push(representation);
      }
  }

}

class PlayerRepresentation implements PlayerInfo {
    id: string;
    teamEmblem: string;
    playerImage: string;
    name: string;
}
