import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Auth} from "./services/auth-service";
import {TranslateService} from "ng2-translate";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  styleUrls: ['./app.component.css', './flag-icon.css'],
  templateUrl: './app.component.html',
  providers: [ Auth ],
})
export class AppComponent {

  title: string = title;

  languagesAvailable: string[] = [];


  constructor(private router: Router, private auth: Auth, private translate: TranslateService) {
    translate.addLangs(["en", "es", "fr", "nl"]);
    translate.setDefaultLang('en');

    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

    this.languagesAvailable = translate.getLangs();

  }


  getFlag(language: string): string {
      return `../images/flags/1x1/${language}.svg`
  }

  setLanguage(language: string): void {
      this.translate.use(language);
  }

}

export const title: string = "Team Builting App";
