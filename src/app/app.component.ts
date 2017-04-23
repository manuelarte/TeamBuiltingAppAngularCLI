import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Auth} from "./services/auth-service";
import {MdDialog, MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {TeamCudComponent} from "./profile/team-cud/team-cud.component";

export const title = 'Team Builting App';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
  providers: [ Auth, MdIconRegistry ],
})
export class AppComponent implements OnInit {

  title: string = title;

  languagesAvailable: string[] = [];

  constructor(private router: Router, private auth: Auth) {
  }

  ngOnInit(): void {
  }

  isAuthenticated(): boolean {
      return this.auth.authenticated();
  }

  login(): void {
      this.auth.login();
  }

  logout(): void {
      this.auth.logout();
  }

}
