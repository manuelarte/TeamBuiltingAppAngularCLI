import {Input, Component, OnInit} from "@angular/core";

import {Season} from "../../services/season-utils.service";
import {Player} from "../../player";
import {Team} from "../../team";
import {RouterUtilsService} from "../../services/router-utils.service";
import {MdDialog} from "@angular/material";
import {GiveRewardComponent} from "../give-reward/give-reward.component";
import {TeamService} from "app/services/team.service";
import {PlayerService} from "app/services/player.service";
import {PlayerToTeam} from "../../player-to-team";
import {DatesService} from "../../services/dates-service";
/**
    * @author Manuel
    * @since 05/11/2016
    */
@Component({
  selector: 'app-player-in-team',
  templateUrl: 'player-in-team.component.html',
  styleUrls: ['player-in-team.component.scss', 'player-card.scss'],
  providers: [TeamService, PlayerService, DatesService, RouterUtilsService]
})
export class PlayerInTeamComponent implements OnInit {

  team: Team;
  teamLoadingFlag = false;
  errorTeamLoadingFlag = false;

  player: Player;
  playerLoadingFlag = false;
  errorPlayerLoadingFlag = false;

  @Input() playerToTeam: PlayerToTeam;
  @Input() season: Season;

  constructor(private teamService: TeamService, private playerService: PlayerService,
              private datesService: DatesService, public routerUtilsService: RouterUtilsService, public dialog: MdDialog) {}


  ngOnInit(): void {
    if (this.playerToTeam) {
        this.teamLoadingFlag = true;
        this.teamService.getTeam(this.playerToTeam.teamId).then(team => {
          this.teamLoadingFlag = false;
          this.team = team;
        }).catch(error => {
          this.teamLoadingFlag = false;
          this.errorTeamLoadingFlag = true;
        });

        this.playerLoadingFlag = true;
        this.playerService.getPlayer(this.playerToTeam.playerId).then(player => {
            this.playerLoadingFlag = false;
            this.player = player;
        }).catch(error => {
            this.playerLoadingFlag = false;
            this.errorPlayerLoadingFlag = true;
        })
    }
  }

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

  isBusy(): boolean {
    return this.teamLoadingFlag || this.playerLoadingFlag;
  }

  timeInTeam(): string {
    const endDate: Date = this.playerToTeam.toDate ? new Date(this.playerToTeam.toDate) : new Date();
    const timeDiff: {years: number, months: number, days: number} = this.datesService.getTimeBetweenTwoDates(endDate, new Date(this.playerToTeam.fromDate));
    let years: number = Math.floor(timeDiff.months/12);
    let spareMonths: number = Math.abs(((timeDiff.years*12)-timeDiff.months));
    let spareDays: number = Math.abs((timeDiff.months*31) - timeDiff.days);
    let message = '';
    if (years > 0) {
        message += years + " years ";
    }
    if (spareMonths > 0) {
        message += spareMonths + " months "
    }
    if (spareDays > 0) {
        message += spareDays + " days";
    }
    return message;
  }

}
