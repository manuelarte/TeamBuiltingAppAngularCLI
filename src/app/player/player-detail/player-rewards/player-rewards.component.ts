import {Component, OnInit, Input} from '@angular/core';
import {PlayerService} from '../../../services/player.service';
import {TeamService} from '../../../services/team.service';
import {Auth} from '../../../services/auth-service';
import {UserDataService} from '../../../services/user-data.service';
import {PlayerRewardsService} from '../../../services/player-rewards.service';
import {SeasonUtilService} from '../../../services/season-utils.service';
import {PlayerReward} from '../../../player-reward';
import {Player} from '../../../player';
import {UserData} from '../../../user-data';
import {Team} from '../../../team';
import {UserService} from '../../../services/user.service';


@Component({
  selector: 'app-player-rewards',
  templateUrl: 'player-rewards.component.html',
  styleUrls: ['player-rewards.component.scss'],
  providers: [PlayerService, TeamService, PlayerRewardsService, UserService, UserDataService, SeasonUtilService ]
})
export class PlayerRewardsComponent implements OnInit {

  @Input() player: Player;

  private userAndReward: Map<string, {user: any, playerRewards: PlayerReward[]}> =
      new Map<string, {user: any, playerRewards: PlayerReward[]}>();
  loadingRewardsFlag = false;
  errorLoadingRewards = false;
  private teams: {[teamId: string]: Team} = {};

  userData: UserData;
  userDataLoaded = false;

  constructor(
    private auth: Auth,
    private teamService: TeamService,
    private playerRewardsService: PlayerRewardsService,
    private userService: UserService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.loadingRewardsFlag = true;
    this.errorLoadingRewards = false;
    this.playerRewardsService.getPlayerRewards(this.player.id).then(playerRewards => {
        playerRewards.forEach(playerReward => {
            this.userService.getUser(playerReward.userId).then(user => {
                this.teamService.getTeam(playerReward.teamId).then(team => {
                    this.userAndReward.set(playerReward.userId,
                        {user: user, playerRewards: this.addAndRetrievePlayerRewardForUser(playerReward)});
                    if (!this.teams[playerReward.teamId]) {
                        this.teams[playerReward.teamId] = team;
                    }
                });
            });
        });
        this.loadingRewardsFlag = false;
    }).catch(error => {
        this.loadingRewardsFlag = false;
        this.errorLoadingRewards = true;
    });

    if (this.auth.authenticated()) {
        this.userDataService.getUserPlayerData().then(userData => {
            this.userData = userData;
            this.userDataLoaded = true;
        }).catch(error => {
            this.userDataLoaded = true;
            this.errorLoadingRewards = true;
        });
    }
  }

  private addAndRetrievePlayerRewardForUser(playerReward: PlayerReward): PlayerReward[] {
    const toReturn: PlayerReward[] = this.userAndReward.has(playerReward.userId) ?
        this.userAndReward.get(playerReward.userId).playerRewards : [];
    toReturn.push(playerReward);
    return toReturn;
  }

  isEverythingLoaded(): boolean {
      return !this.loadingRewardsFlag;
  }

  getUserForUserId(userId: string): any {
      return this.userAndReward.get(userId).user;
  }

  getTeam(teamId: string) {
      return this.teams[teamId];
  }

  sameUser(): boolean {
      return this.userData.playerId ? this.userData.playerId === this.player.id : false;
  }

  getRewards(): PlayerReward[] {
      const values: {user: any, playerRewards: PlayerReward}[] = this.values(this.userAndReward);
      return [].concat.apply([], values.filter(entry => entry != null).map(entry => entry.playerRewards));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private values<Y>(data: {[key: string]: any}): any {
    return Object.keys(data).map(key => data[key]);
  }

}
