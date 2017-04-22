import {Component, Input, OnInit} from '@angular/core';
import {PlayerToTeam} from '../../player-to-team';
import {TeamService} from '../../services/team.service';
import {Team} from '../../team';
import {Player} from '../../player';
import {PlayerService} from '../../services/player.service';
import {Auth} from '../../services/auth-service';
import {UserDataService} from '../../services/user-data.service';
import {UserData} from '../../user-data';
import {DatesService} from '../../services/dates-service';

@Component({
  selector: 'app-player-to-team-show',
  templateUrl: './player-to-team-show.component.html',
  styleUrls: ['./player-to-team-show.component.scss'],
  providers: [PlayerService, TeamService, UserDataService, DatesService, Auth]
})
export class PlayerToTeamShowComponent implements OnInit {

  @Input() playerToTeam: PlayerToTeam = new PlayerToTeam();
  team: Team;
  loadingTeamFlag = true;
  errorLoadingTeam = false;

  player: Player;
  loadingPlayerFlag = true;
  errorLoadingPlayer = false;

  userData: UserData;
  loadingUserDataFlag = true;
  errorLoadingUserData = false;

  editing = false;

  constructor(private playerService: PlayerService, private teamService: TeamService, private userDataService: UserDataService,
              private datesService: DatesService, private auth: Auth) { }

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
        });
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
          });
      }

       if (this.auth.authenticated()) {
          this.loadingUserDataFlag = true;
          this.userDataService.getUserPlayerData().then(userData => {
              this.userData = userData;
              this.loadingUserDataFlag = false;
              this.errorLoadingUserData = false;
          }).catch(error => {
              this.loadingUserDataFlag = false;
              this.errorLoadingUserData = true;
          });
      }


  }

  getPictureBasedOnSport(): string {
      let pictureUrl = '../../images/sports/football.jpg';
      if (this.team) {
          switch (this.team.sport) {
              case 'Football': {
                  pictureUrl = '../../images/sports/football.jpg'
                  break;
              }
              case 'Futsal': {
                  // statements;
                  break;
              }
              default: {
                  // statements;
                  break;
              }
          }
      }
      return pictureUrl;
  }

  userCanEdit(): boolean {
      return this.auth.userProfile ? this.auth.userProfile.user_id === this.userData.userId : false;
  }

}
