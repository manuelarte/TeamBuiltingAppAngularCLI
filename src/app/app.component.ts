import {Component, OnInit} from '@angular/core';
import {Auth} from './services/auth-service';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

export const title = 'Team Builting App';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
  providers: [],
})
export class AppComponent implements OnInit {

  title: string = title;

  languagesAvailable: string[] = [];

  constructor(private auth: Auth, private mdIconRegistry: MdIconRegistry, private sanitizer: DomSanitizer) {
      this.mdIconRegistry.addSvgIcon('team', sanitizer.bypassSecurityTrustResourceUrl('/images/icons/football-badge.svg'));
      this.mdIconRegistry.addSvgIcon('player-to-team', sanitizer.bypassSecurityTrustResourceUrl('/images/icons/football-fans-group.svg'));
      this.mdIconRegistry.addSvgIcon('sport-position', sanitizer.bypassSecurityTrustResourceUrl('/images/icons/football-field.svg'));
      this.mdIconRegistry.addSvgIcon('player-profile',
        sanitizer.bypassSecurityTrustResourceUrl('/images/icons/football/football-player-with-the-ball-under-the-feet.svg'));
      this.mdIconRegistry.addSvgIcon('shorts-with-number-12',
        sanitizer.bypassSecurityTrustResourceUrl('/images/icons/football/football-shorts-with-number-12.svg'));
      this.mdIconRegistry.addSvgIcon('reward', sanitizer.bypassSecurityTrustResourceUrl('/images/icons/football/football-medal.svg'));
      this.mdIconRegistry.addSvgIcon('futsal_pitch', sanitizer.bypassSecurityTrustResourceUrl('/images/icons/futsal/futsal_pitch.svg'));
      this.mdIconRegistry.addSvgIcon('football_field',
          sanitizer.bypassSecurityTrustResourceUrl('/images/icons/football/football-field-top-view.svg'));
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
