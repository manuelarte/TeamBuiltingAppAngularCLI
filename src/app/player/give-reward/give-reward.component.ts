import {Component, Input, OnInit}      from '@angular/core';

import {FormGroup, FormControl, Validators} from "@angular/forms";
import {PlayerRewardsService} from "../../services/player-rewards.service";
import {Player} from "../../player";
import {Team} from "../../team";
import {Season} from "../../services/season-utils.service";
import {PlayerReward} from '../../player-reward';
import {Auth} from "../../services/auth-service";
import {MatDialogRef, MatIconRegistry, MatSnackBar} from "@angular/material";
import {Reward, Rewards} from "../../rewards";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'give-reward',
    templateUrl: 'give-reward.component.html',
    styleUrls: ['give-reward.component.scss'],
    providers: [ Auth, PlayerRewardsService ]
})
export class GiveRewardComponent implements OnInit  {

    @Input() player: Player;
    @Input() team: Team;
    @Input() season: Season;
    model: PlayerReward = new PlayerReward();

    rewards: {dbName: string, object: Reward}[] = [];
    errorLoadingRewards = false;

    submittingReward = false;

    playerRewardForm = new FormGroup({
        comment: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(200)])),
        reward: new FormControl('', Validators.required)
    });

    constructor(
        private auth: Auth,
        private playerRewardService: PlayerRewardsService,
        public dialogRef: MatDialogRef<GiveRewardComponent>,
        public snackBar: MatSnackBar,
        private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer
    ) {
        iconRegistry.addSvgIconInNamespace('reward', 'best-player', sanitizer.bypassSecurityTrustResourceUrl('/images/icons/football/football-player-with-the-ball-under-the-feet.svg'));
        iconRegistry.addSvgIconInNamespace('reward', 'top-scorer', sanitizer.bypassSecurityTrustResourceUrl('/images/icons/football/football-in-midair.svg'));
        iconRegistry.addSvgIconInNamespace('reward', 'worst-one', sanitizer.bypassSecurityTrustResourceUrl('/images/icons/football-fans-group.svg'));
        iconRegistry.addSvgIconInNamespace('reward', 'best-goal', sanitizer.bypassSecurityTrustResourceUrl('/images/icons/football/football-player-kicking-ball-upward.svg'));
        iconRegistry.addSvgIconInNamespace('reward', 'who-are-you', sanitizer.bypassSecurityTrustResourceUrl('/images/icons/football-fans-group.svg'));
        iconRegistry.addSvgIconInNamespace('reward', 'best-coach', sanitizer.bypassSecurityTrustResourceUrl('/images/icons/football/football-sketch-for-practice.svg'));
        iconRegistry.addSvgIconInNamespace('reward', 'most-injured', sanitizer.bypassSecurityTrustResourceUrl('/images/icons/football/football-player-inclined-to-front-flexed-on-knees.svg'));
    }

    ngOnInit(): void {
        this.model.teamId = this.team.id;
        this.model.playerId = this.player.id;
        this.model.fromDate = this.season.startDate;
        this.model.toDate = this.season.endDate;
        this.playerRewardService.getRewards().then(rewards =>
            rewards.forEach(reward => this.rewards.push(
                {dbName: reward, object: Rewards.rewards[reward]}
                ))
        ).catch(error => this.errorLoadingRewards = true)
    }

    onSubmit() {
        this.submittingReward = true;
        this.playerRewardService.postNewPlayerReward(this.model).then(playerReward => {
            this.submittingReward = false;
            this.snackBar.open('Reward given');
            this.closeModal();
        }).catch(error =>  {
            this.submittingReward = false;
            this.snackBar.open('Error Giving Reward: ' + error.toString());
        })
    }

    closeModal() {
        this.dialogRef.close();
    }

    isAuthenticated(): boolean {
        return this.auth.isAuthenticated();
    }

    isNotAuthenticated(): boolean {
        return !this.isAuthenticated();
    }

}
