import {Component, OnInit, OnDestroy} from '@angular/core';
import {Auth} from '../services/auth-service';
import {RouterUtilsService} from '../services/router-utils.service';
import {UserDataService} from '../services/user-data.service';
import {UserData} from '../user-data';
import {LoginService} from '../services/login.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-sidenav',
  templateUrl: './profile-sidenav.component.html',
  styleUrls: ['./profile-sidenav.component.scss'],
  providers: [UserDataService, RouterUtilsService]
})
export class ProfileSidenavComponent implements OnInit, OnDestroy {

  userData: UserData;
  userDataLoadingFlag = true;
  userDataErrorFlag = false;
  subscription: Subscription;
  logged = false;

  constructor(private auth: Auth, private loginService: LoginService,
              private userDataService: UserDataService) {
      this.subscription = loginService.loginEvent$.subscribe( response => {
          this.logged = this.auth.authenticated();
          this.ngOnInit();
      });
  }

  ngOnInit(): void {
      if (this.auth.authenticated()) {
          this.userDataService.getUserPlayerData().then(userData => {
              this.userData = userData;
              this.userDataLoadingFlag = false;
          }).catch(error => {
              this.userDataLoadingFlag = false;
              this.userDataErrorFlag = true;
          });
      }
  }

  getUserProfile(): any {
    return this.auth.userProfile;
  }

  getPlayerId(): number {
      return this.userData.playerId;
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  isAuthenticated(): boolean {
      return this.auth.authenticated();
  }

}
