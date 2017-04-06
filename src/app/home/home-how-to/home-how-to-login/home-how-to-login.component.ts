import {Component, OnInit} from "@angular/core";
import {Auth} from "../../../services/auth-service";

@Component({
  selector: 'home-how-to-login',
  styleUrls: ['home-how-to-login.component.scss'],
  templateUrl: 'home-how-to-login.component.html',
  providers: [  ],
})
export class HomeHowToLoginComponent implements OnInit {

    constructor(private auth: Auth) {}

    ngOnInit() {

    }

    login(): void {
        this.auth.login()
    }

}
