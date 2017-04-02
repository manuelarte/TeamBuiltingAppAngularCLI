import {Component, Input, OnInit, EventEmitter, Output}      from '@angular/core';

import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Message} from "primeng/primeng";
import {PlayerRewardsService} from "../../services/player-rewards.service";
import {Player} from "../../player";
import {Team} from "../../team";
import {Season} from "../../services/season-utils.service";
import {PlayerReward} from "../../player-reward";
import {Auth} from "../../services/auth-service";

@Component({
    selector: 'give-reward',
    templateUrl: 'give-reward.component.html',
    styleUrls: ['give-reward.component.scss'],
    providers: [ PlayerRewardsService ]
})
export class GiveRewardComponent implements OnInit  {

    @Input() player: Player;
    @Input() team: Team;
    @Input() addRewardModalOpened: boolean = false;
    @Input() season: Season;
    model: PlayerReward = new PlayerReward();

    msgs: Message[] = [];

    rewards: string[];
    errorLoadingRewards = false;
    cannotLoadScreen: boolean = false;
    submittingReward = false;

    @Output() addRewardModalOpenedChange = new EventEmitter();

    playerRewardForm = new FormGroup({
        comment: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(200)])),
        reward: new FormControl('', Validators.required)
    });

    constructor(
        private auth: Auth,
        private playerRewardService: PlayerRewardsService
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
            this.showSuccessMessage();
            this.closeModal();
        }).catch(error =>  {
            this.submittingReward = false;
            console.log(error)
        })
    }

    closeModal() {
        this.addRewardModalOpened = false;
        this.addRewardModalOpenedChange.emit(this.addRewardModalOpened);
    }

    showSuccessMessage() {
        this.msgs.push({severity:'info', summary:'Player reward saved', detail:'Player Reward saved'});
    }

    isAuthenticated(): boolean {
        return this.auth.authenticated();
    }

    isNotAuthenticated(): boolean {
        return !this.auth.authenticated();
    }

}
