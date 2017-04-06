import {Component, OnInit} from "@angular/core";
import {RouterUtilsService} from "../../../services/router-utils.service";
import {Auth} from "../../../services/auth-service";

@Component({
  selector: 'home-how-to-what-to-do',
  styleUrls: ['home-how-to-what-to-do.component.scss'],
  templateUrl: 'home-how-to-what-to-do.component.html',
  providers: [ RouterUtilsService ],
})
export class HomeHowToWhatToDoComponent implements OnInit {

    constructor(private auth: Auth, private routerUtils: RouterUtilsService) {}

    ngOnInit() {

    }

    authenticated(): boolean {
        return this.auth.authenticated();
    }

}
