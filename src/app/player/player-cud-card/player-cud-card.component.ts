import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../../player";
import {Auth} from "../../services/auth-service";
import {UserData} from "../../user-data";
import {UserDataService} from "app/services/user-data.service";
import {PlayerService} from "../../services/player.service";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-player-cud-card',
  templateUrl: './player-cud-card.component.html',
  styleUrls: ['./player-cud-card.component.scss'],
  providers: [Auth, UserDataService]
})
export class PlayerCudCardComponent implements OnInit {

  @Input() player: Player;
  editing = false;
  submittingFlag = false;
  errorSubmittingFlag = false;

  userData: UserData;
  loadingUserDataFlag = false;
  errorLoadingUserData = false;

  constructor(private auth: Auth, private userDataService: UserDataService, private playerService: PlayerService,
              public snackBar: MdSnackBar) { }

  ngOnInit() {
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

  editEntry(): void {
      this.submittingFlag = true;
      this.playerService.savePlayer(this.player).then(player => {
          this.player = player;
          this.submittingFlag = false;
          this.snackBar.open('Entry Edited');
      }).catch(error => {
          this.submittingFlag = false;
          this.errorSubmittingFlag = true;
          this.snackBar.open('Error Editing Entry:' + error.toString());
      })

  }

  userCanEdit(): boolean {
    return this.auth.userProfile ? this.auth.userProfile.user_id === this.userData.userId : false;
  }

}
