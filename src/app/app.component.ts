import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Auth} from "./services/auth-service";

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
  providers: [ Auth ],
})
export class AppComponent {

  title: string = title;

  languagesAvailable: string[] = [];


  constructor(private router: Router, private auth: Auth,) {
  }

}

export const title: string = "Team Builting App";
