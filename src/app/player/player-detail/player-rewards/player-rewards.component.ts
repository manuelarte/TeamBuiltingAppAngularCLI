import {Component, OnInit, Input}      from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Location }               from '@angular/common';
import {PlayerService} from "../../../services/player.service";
import {TeamService} from "../../../services/team.service";
import {Auth} from "../../../services/auth-service";
import {UserDataService} from "../../../services/user-data.service";
import {PlayerRewardsService} from "../../../services/player-rewards.service";
import {SeasonUtilService, Season} from "../../../services/season-utils.service";
import {PlayerReward} from "../../../player-reward";
import {Player} from "../../../player";
import {UserData} from "../../../user-data";
import {Team} from "../../../team";
import {UserService} from "../../../services/user.service";


@Component({
  selector: 'player-rewards',
  templateUrl: 'player-rewards.component.html',
  styleUrls: ['player-rewards.component.scss'],
  providers: [PlayerService, TeamService, PlayerRewardsService, UserService, UserDataService, SeasonUtilService ]
})
export class PlayerRewardsComponent implements OnInit {

  @Input() player: Player;

  private userAndReward: {[userId: string]: {user: any, playerRewards: PlayerReward[]}} = {};
  rewardsLoaded: boolean = false;
  private teams: {[teamId: string]: Team} = {};

  userData: UserData;
  userDataLoaded: boolean = false;

  constructor(
    private auth: Auth,
    private teamService: TeamService,
    private playerRewardsService: PlayerRewardsService,
    private userService: UserService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.playerRewardsService.getPlayerRewards(this.player.id).then(playerRewards => {
        playerRewards.forEach(playerReward => {
            this.userService.getUser(playerReward.userId).then(user => {
                this.teamService.getTeam(playerReward.teamId).then(team => {
                    this.userAndReward[playerReward.userId] = {user: user, playerRewards: this.addAndRetrievePlayerRewardForUser(playerReward)};
                    if (!this.teams[playerReward.teamId]) {
                        this.teams[playerReward.teamId] = team;
                    }
                })
            })
        });
        this.rewardsLoaded = true;
    }).catch(error => {
        this.rewardsLoaded = true;
    });

    if (this.auth.authenticated()) {
        this.userDataService.getUserPlayerData().then(userData => {
            this.userData = userData;
            this.userDataLoaded = true;
        }).catch(error => {
            this.userDataLoaded = true;
        })
    }
  }

  private addAndRetrievePlayerRewardForUser(playerReward: PlayerReward): PlayerReward[] {
    let toReturn: PlayerReward[] = this.userAndReward[playerReward.userId]? this.userAndReward[playerReward.userId].playerRewards : [];
    toReturn.push(playerReward);
    return toReturn;
  }

  isEverythingLoaded(): boolean {
      return this.rewardsLoaded;
  }

  getUserForUserId(userId: string): any {
      return this.userAndReward[userId].user;
  }

  getTeam(teamId: string) {
      return this.teams[teamId];
  }

  sameUser(): boolean {
      return this.userData.playerId ? this.userData.playerId === this.player.id : false;
  }

  getRewards(): PlayerReward[] {
      let values: {user: any, playerRewards: PlayerReward}[] = this.values(this.userAndReward);
      return [].concat.apply([], values.filter(entry => entry != null).map(entry => entry.playerRewards));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private values<Y>(data: {[key: string]: any}): any {
    return Object.keys(data).map(key=>data[key])
  }

}
