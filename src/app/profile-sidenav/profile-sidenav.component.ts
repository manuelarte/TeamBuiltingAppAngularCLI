import { Component, OnInit } from '@angular/core';
import {Auth} from '../services/auth-service';
import {RouterUtilsService} from '../services/router-utils.service';
import {UserDataService} from "../services/user-data.service";
import {UserData} from "../user-data";

@Component({
  selector: 'app-profile-sidenav',
  templateUrl: './profile-sidenav.component.html',
  styleUrls: ['./profile-sidenav.component.scss'],
  providers: [UserDataService, RouterUtilsService]
})
export class ProfileSidenavComponent implements OnInit {

  userData: UserData;
  userDataLoadingFlag = true;
  userDataErrorFlag = false;

  constructor(private auth: Auth, private userDataService: UserDataService) { }

  ngOnInit() {
      if (this.auth.authenticated()) {
          this.userDataService.getUserPlayerData().then(userData => {
            this.userData = userData;
            this.userDataLoadingFlag = false;
          }).catch(error => {
            this.userDataLoadingFlag = false;
            this.userDataErrorFlag = true;
          })
      }
  }

  getUserProfile(): any {
    return this.auth.userProfile;
  }

  getPlayerId(): number {
      return this.userData.playerId;
  }

}
