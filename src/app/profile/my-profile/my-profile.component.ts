import {Component, OnInit} from "@angular/core";
import {Auth} from "../../services/auth-service";
import {PlayerService} from "../../services/player.service";
import {UserDataService} from "../../services/user-data.service";
import {Player} from "../../player";
import {UserData} from "../../user-data";

@Component({
  styleUrls: ['my-profile.component.css'],
  templateUrl: 'my-profile.component.html',
  providers: [ Auth, PlayerService, UserDataService ],
})
export class MyProfileComponent implements OnInit {

    originalPlayer: Player;
    originalPlayerLoaded: boolean = false;
    errorRetrievingUserData: boolean = false;
    userData: UserData;

    constructor(private auth: Auth,
                private userDataService: UserDataService,
                private playerService: PlayerService) {}

    ngOnInit() {
        this.userDataService.getUserData()
            .then(userData => {
                this.userData = userData;
                if (this.userData.playerId) {
                    this.playerService.getPlayer(this.userData.playerId).then(player => {
                        this.originalPlayer = player;
                        this.originalPlayerLoaded = true;
                    }).catch(error => {
                        this.originalPlayerLoaded = true;
                        this.handleError(error)
                    });
                } else {
                    this.originalPlayerLoaded = true;
                }
            }).catch(error => {
                this.errorRetrievingUserData = true;
                this.handleError(error);
        });

    }

    isPlayerLoaded(): boolean {
        return this.originalPlayerLoaded;
    }

    authenticatedAndWithUserProfile(): boolean {
        return this.auth.authenticated() && this.auth.userProfile;
    }

    private handleError(error: any) {
        console.error("The error:", error)
    }

}
