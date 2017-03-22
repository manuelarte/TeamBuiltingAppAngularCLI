import {Component, Input, OnInit, EventEmitter, Output}      from '@angular/core';

import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Message} from "primeng/primeng";
import {PlayerRewardsService} from "../../services/player-rewards.service";
import {Player} from "../../player";
import {Team} from "../../team";
import {Season} from "../../services/season-utils.service";
import {PlayerReward} from "../../player-reward";

@Component({
    moduleId: module.id,
    selector: 'give-reward',
    templateUrl: 'give-reward.component.html',
    styleUrls: ['give-reward.component.css'],
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

    @Output() addRewardModalOpenedChange = new EventEmitter();

    playerRewardForm = new FormGroup({
        comment: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(200)])),
        reward: new FormControl('', Validators.required)
    });

    constructor(
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
        console.debug("Submitting player reward:", this.model);
        this.playerRewardService.postNewPlayerReward(this.model).then(team => {
            this.showSuccessMessage();
            this.closeModal();
        }).catch()
    }

    closeModal() {
        this.addRewardModalOpened = false;
        this.addRewardModalOpenedChange.emit(this.addRewardModalOpened);
    }

    showSuccessMessage() {
        this.msgs.push({severity:'info', summary:'Player reward saved', detail:'Player Reward saved'});
    }

}
