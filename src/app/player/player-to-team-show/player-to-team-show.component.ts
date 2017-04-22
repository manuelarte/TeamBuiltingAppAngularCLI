import {Component, Input, OnInit} from '@angular/core';
import {PlayerToTeam} from "../../player-to-team";
import {TeamService} from "../../services/team.service";
import {Team} from "../../team";
import {Player} from "../../player";
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'app-player-to-team-show',
  templateUrl: './player-to-team-show.component.html',
  styleUrls: ['./player-to-team-show.component.scss'],
  providers: [PlayerService, TeamService]
})
export class PlayerToTeamShowComponent implements OnInit {

  @Input() playerToTeam: PlayerToTeam = new PlayerToTeam();
  team: Team;
  loadingTeamFlag: boolean = true;
  errorLoadingTeam: boolean = false;

  player: Player;
  loadingPlayerFlag: boolean = true;
  errorLoadingPlayer: boolean = false;

  editing: boolean = false;

  constructor(private playerService: PlayerService, private teamService: TeamService) { }

  ngOnInit() {
      if (this.playerToTeam.teamId) {
        this.loadingTeamFlag = true;
        this.teamService.getTeam(this.playerToTeam.teamId).then(team => {
            this.team = team;
            this.loadingTeamFlag = false;
            this.errorLoadingTeam = false;
        }).catch(error => {
            this.loadingTeamFlag = false;
            this.errorLoadingTeam = true;
        })
      }

      if (this.playerToTeam.playerId) {
          this.loadingPlayerFlag = true;
          this.playerService.getPlayer(this.playerToTeam.playerId).then(player => {
              this.player = player;
              this.loadingPlayerFlag = false;
              this.errorLoadingPlayer = false;
          }).catch(error => {
              this.loadingPlayerFlag = false;
              this.errorLoadingPlayer = true;
          })
      }
  }

  getPictureBasedOnSport(): string {
      let pictureUrl: string = "../../images/sports/football.jpg";
      if (this.team) {
          switch(this.team.sport) {
              case 'Football': {
                  pictureUrl = "../../images/sports/football.jpg"
                  break;
              }
              case 'Futsal': {
                  //statements;
                  break;
              }
              default: {
                  //statements;
                  break;
              }
          }
      }
      return pictureUrl;
  }

}
