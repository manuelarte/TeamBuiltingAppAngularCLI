import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../player';
import {Auth} from '../../services/auth-service';
import {UserData} from '../../user-data';
import {UserDataService} from '../../services/user-data.service';
import {PlayerService} from '../../services/player.service';
import {MatSnackBar} from '@angular/material';
import {UserRightsService} from '../../services/user-rights.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-player-cud-card',
  templateUrl: './player-cud-card.component.html',
  styleUrls: ['./player-cud-card.component.scss'],
  providers: [Auth, UserDataService]
})
export class PlayerCudCardComponent implements OnInit {

  @Input() player: Player;
  playerForm: FormGroup;
  editing = false;
  submittingFlag = false;
  errorSubmittingFlag = false;

  userData: UserData;
  loadingUserDataFlag = false;
  errorLoadingUserData = false;

  constructor(private auth: Auth, private userDataService: UserDataService, private playerService: PlayerService,
              public snackBar: MatSnackBar, private userRightsService: UserRightsService) { }

  ngOnInit() {
      if (this.auth.isAuthenticated()) {
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
          this.editing = false;
      }).catch(error => {
          this.submittingFlag = false;
          this.errorSubmittingFlag = true;
          this.snackBar.open('Error Editing Entry:' + error.toString());
      });

  }

  userCanEdit(): boolean {
      return this.userRightsService.userCanEdit(this.userData, this.player.id);
  }

}
