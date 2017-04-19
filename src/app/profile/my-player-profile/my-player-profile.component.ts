import {Component, OnInit, Input, EventEmitter, Output} from "@angular/core";
import {Message} from "primeng/primeng";
import {Router} from "@angular/router";
import {UserDataService} from "../../services/user-data.service";
import {PlayerService} from "../../services/player.service";
import {Auth} from "../../services/auth-service";
import {Player} from "../../player";
import {UserData} from "../../user-data";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'my-player-profile',
  styleUrls: ['my-player-profile.component.scss'],
  templateUrl: 'my-player-profile.component.html',
  providers: [ Auth, PlayerService, UserDataService ],
})
export class MyPlayerProfileComponent implements OnInit {

    @Input() originalPlayerValue: Player;
    @Output() originalPlayerChange: EventEmitter<Player> = new EventEmitter<Player>();

    @Input() userData: UserData;
    editedPlayer: Player;
    submitting: boolean = false;

    playerForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])),
        nickname: new FormControl('', Validators.compose([Validators.minLength(2), Validators.maxLength(20)])),
        bornAddress: new FormControl('', Validators.compose([Validators.minLength(6), Validators.maxLength(200)])),
        imageLink: new FormControl('', Validators.required),
    });

    playerCrudMessage: Message[] = [];

    constructor(private auth: Auth,
                private playerService: PlayerService,
                private router: Router) {
    }

    ngOnInit() {
        if (this.originalPlayerValue) {
            this.editedPlayer = this.copyPlayer(this.originalPlayerValue);
        }
    }

    @Input()
    get originalPlayer() {
        return this.originalPlayerValue;
    }

    set originalPlayer(val) {
        this.originalPlayerValue = val;
        this.originalPlayerChange.emit(this.originalPlayerValue);
    }

    private copyPlayer(player: Player): Player {
        return {id: player.id, name: player.name, nickname: player.nickname, bornAddress: player.bornAddress, imageLink: player.imageLink};
    }

    returnToPreviousState(): void {
        this.editedPlayer = this.originalPlayerValue ? this.copyPlayer(this.originalPlayerValue) : null;
    }

    originalAndEditedAreEqual(): boolean {
        return this.originalPlayerValue ? this.originalPlayerValue.name === this.editedPlayer.name && this.originalPlayerValue.nickname === this.editedPlayer.nickname &&
            this.originalPlayerValue.bornAddress === this.editedPlayer.bornAddress : false;
    }

    createPlayer(): Player {
        let player: Player = new Player();
        player.name = this.auth.userProfile.given_name + " " + this.auth.userProfile.family_name;
        player.nickname = this.auth.userProfile.nickname;
        player.imageLink = this.auth.userProfile.picture;
        return player;
    }

    savePlayer(): void {
        console.log("saving player")
        this.submitting = true;
        this.playerService.createNewPlayer(this.editedPlayer).then(playerCreated => {
            this.userData.playerId = playerCreated.id;
            this.originalPlayer = playerCreated;
            this.returnToPreviousState();
            this.submitting = false;
            this.showSuccessMessage('Player created');
        }).catch(error =>{
            this.submitting = false;
            this.showFailMessage(error, 'Player could not be saved');
        })
    }

    private showSuccessMessage(detailedMessage: string): void {
        this.playerCrudMessage = [];
        this.playerCrudMessage.push({severity:'success', summary:'Success', detail: detailedMessage});
    }

    private showFailMessage(error, detailedMessage): void {
        this.playerCrudMessage = [];
        this.playerCrudMessage.push({severity:'error', summary:'Failed', detail: detailedMessage});
    }

    deletePlayer(): void {
        this.playerService.deletePlayer(this.originalPlayerValue.id).then(content => {
                this.showSuccessMessage('Player deleted');
                this.originalPlayer = null;
                this.returnToPreviousState();
                this.userData.playerId = null;
            })
            .catch(error => this.showFailMessage(error, 'Player could not be deleted'))
    }

    goToPlayerDetail(): void {
        let link = ['/player', this.originalPlayerValue.id];
        this.router.navigate(link);
    }

    private handleError(error: any) {
        console.error("The error:", error)
    }

}
