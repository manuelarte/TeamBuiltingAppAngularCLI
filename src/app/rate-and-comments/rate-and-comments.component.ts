import { Component} from "@angular/core";

import {Router} from "@angular/router";
import {Auth} from "../services/auth-service";
/**
 * @author Manuel
 * @since 11/12/2016.
 */
@Component({
  moduleId: module.id,
  selector: 'rate-and-comments',
  templateUrl: 'rate-and-comments.component.html',
  styleUrls: ['rate-and-comments.component.scss'],
})
export class RateAndCommentsComponent {
  userProfile: any;

  usefulMark: number = 3;
  likeMark: number = 3;

  name: string = "";
  email: string = "";
  comment: string;


  constructor(private auth: Auth) {
      this.userProfile = auth.userProfile;
      if (this.userProfile) {
          this.name = this.getName();
          this.email = this.getEmail();
      }
  }

  getName(): string {
      return this.userProfile ? this.userProfile.given_name + ' ' + this.userProfile.family_name : '';
  }

  getEmail(): string {
      return this.userProfile ? this.userProfile.email : '';
  }

}
