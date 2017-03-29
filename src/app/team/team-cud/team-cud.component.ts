import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TeamSportService} from "../../services/sports-service";
import {TeamService} from "../../services/team.service";
import {Team} from "../../team";
import {TeamSport} from "../../team-sports";
import {FormGroup, FormControl, Validators, ValidatorFn, AbstractControl} from "@angular/forms";

@Component({
    selector: 'team-cud',
    templateUrl: 'team-cud.component.html',
    styleUrls: [ 'team-cud.component.scss' ],
    providers: [ TeamSportService, TeamService ]
})
export class TeamCudComponent implements OnInit {
    @Input() model: Team = new Team();
    @Input() compact: boolean = false;
    @Input() private teamModalOpened: boolean = true;
    @Output() teamModalOpenedChange: EventEmitter<boolean> = new EventEmitter();
    @Output() teamUpdated: EventEmitter<Team> = new EventEmitter();
    sports: TeamSport[];
    submitted: boolean = false;
    isBusy: boolean = true;
    stillActive: boolean = true;

    teamForm = new FormGroup({
        name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(200)])),
        sport: new FormControl('', Validators.required),
        bio: new FormControl('', Validators.maxLength(500)),
        fromDate: new FormControl('', Validators.required),
        toDate: new FormControl({disabled: this.stillActive ? true : false}, ),
        emblemLink: new FormControl('', Validators.compose([Validators.minLength(6), Validators.maxLength(500)])),
        location: new FormControl('', Validators.compose([Validators.minLength(6), Validators.maxLength(200)])),
    });

    constructor(
        private teamService: TeamService,
        private teamSportService: TeamSportService,
    ) {
    }

    ngOnInit(): void {
        this.teamSportService.getTeamSportsAvailable().then(sports => {
            this.sports = sports;
            this.isBusy = false;
        }).catch(error => {
            this.isBusy = false;
            this.handleError(error);
        });
    }

    isTeamModalOpened() {
        return this.teamModalOpened;
    }

    onSubmit() {
        this.isBusy = true;
        this.teamService.postTeam(this.model).then(team => {
            this.model = team;
            this.submitted = true;
            this.isBusy = false;
            this.teamUpdated.emit(team);
            this.closeModal();
        }).catch(error => {
            this.isBusy = false;
            this.handleError;
        })

    }

    closeModal() {
        this.teamModalOpened = false;
        this.teamModalOpenedChange.emit(this.teamModalOpened);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
