import {Input, Component, OnInit} from "@angular/core";

import {Season} from "../../services/season-utils.service";
import {Player} from "../../player";
import {Team} from "../../team";
import {RouterUtilsService} from "../../services/router-utils.service";
import {MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";
import {GiveRewardComponent} from "../give-reward/give-reward.component";
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

  ngOnInit(): void {
  }

  constructor(public routerUtilsService: RouterUtilsService, public dialog: MdDialog) {}

  getPicture() {
    return this.player.imageLink;
  }

  openAddReward(): void {
    const dialogRef = this.dialog.open(GiveRewardComponent);
      dialogRef.afterClosed().subscribe(result => {
    });
    dialogRef.componentInstance.season = this.season;
    dialogRef.componentInstance.player = this.player;
    dialogRef.componentInstance.team = this.team;
  }

}
