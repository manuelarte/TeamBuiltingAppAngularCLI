import {Input, Component, OnInit} from "@angular/core";

import {Router} from "@angular/router";
import {Season} from "../../services/season-utils.service";
import {Player} from "../../player";
import {Team} from "../../team";
import {RouterUtilsService} from "../../services/router-utils.service";
/**
 * Created by Manuel on 05/11/2016.
 */
@Component({
  selector: 'player-in-team',
  templateUrl: 'player-in-team.component.html',
  styleUrls: ['player-in-team.component.scss', 'player-card.scss'],
  providers: [RouterUtilsService]
})
export class PlayerInTeamComponent implements OnInit {

  @Input() team: Team;
  @Input() player: Player = new Player();
  @Input() season: Season;

  addRewardModalOpened: boolean = false;

  private actionCardForPlayer: boolean = false;

  ngOnInit(): void {
  }

  constructor(public routerUtilsService: RouterUtilsService) {}

  getPicture() {
    return this.player.imageLink;
  }

  openAddReward(): void {
      this.addRewardModalOpened = true
  }

  changeActionCardForPlayer(): void {
      this.actionCardForPlayer = !this.actionCardForPlayer;
  }

  isActionCardForPlayerOpen(): boolean {
      return this.actionCardForPlayer == true;
  }

}
