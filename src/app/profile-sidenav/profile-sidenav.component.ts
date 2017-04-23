import { Component, OnInit } from '@angular/core';
import {Auth} from '../services/auth-service';
import {RouterUtilsService} from '../services/router-utils.service';

@Component({
  selector: 'app-profile-sidenav',
  templateUrl: './profile-sidenav.component.html',
  styleUrls: ['./profile-sidenav.component.scss'],
  providers: [Auth, RouterUtilsService]
})
export class ProfileSidenavComponent implements OnInit {

  constructor(private auth: Auth, private routerUtilsService: RouterUtilsService) { }

  ngOnInit() {
  }

  getUserProfile(): any {
    return this.auth.userProfile;
  }

}
