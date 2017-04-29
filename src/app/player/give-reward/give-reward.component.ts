import {Component, Input, OnInit, EventEmitter, Output}      from '@angular/core';

import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Message} from "primeng/primeng";
import {PlayerRewardsService} from "../../services/player-rewards.service";
import {Player} from "../../player";
import {Team} from "../../team";
import {Season} from "../../services/season-utils.service";
import {PlayerReward} from "../../player-reward";
import {Auth} from "../../services/auth-service";
import {MdDialogRef, MdSnackBar} from "@angular/material";

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

    rewards: string[];
    errorLoadingRewards = false;

    submittingReward = false;

    playerRewardForm = new FormGroup({
        comment: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(200)])),
        reward: new FormControl('', Validators.required)
    });

    constructor(
        private auth: Auth,
        private playerRewardService: PlayerRewardsService,
        public dialogRef: MdDialogRef<GiveRewardComponent>,
        public snackBar: MdSnackBar,
    ) {}

    ngOnInit(): void {
        this.model.teamId = this.team.id;
        this.model.playerId = this.player.id;
        this.model.fromDate = this.season.startDate;
        this.model.toDate = this.season.endDate;
        this.playerRewardService.getRewards().then(rewards => this.rewards = rewards).catch(error => this.errorLoadingRewards = true)
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
        return this.auth.authenticated();
    }

    isNotAuthenticated(): boolean {
        return !this.auth.authenticated();
    }

}
