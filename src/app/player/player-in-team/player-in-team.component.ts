import {Input, Component, OnInit} from "@angular/core";

import {Router} from "@angular/router";
import {Season} from "../../services/season-utils.service";
import {Player} from "../../player";
import {Team} from "../../team";
/**
 * Created by Manuel on 05/11/2016.
 */
@Component({
  moduleId: module.id,
  selector: 'player-in-team',
  templateUrl: 'player-in-team.component.html',
  styleUrls: ['player-in-team.component.css', 'player-card.css'],
})
export class PlayerInTeamComponent implements OnInit {

  @Input() team: Team;
  @Input() player: Player = new Player();
  @Input() season: Season;

  addRewardModalOpened: boolean = false;

  private actionCardForPlayer: boolean = false;

  ngOnInit(): void {
  }

  constructor(private router: Router) {}

  getPicture() {
    return this.player.imageLink;
  }

  gotoPlayerDetails(): void {
      this.router.navigateByUrl(`/player/${this.player.id}`);
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
