import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TeamSportService} from '../../services/sports-service';
import {TeamService} from '../../services/team.service';
import {Team} from '../../team';
import {MdDialogRef, MdSnackBar} from '@angular/material';

@Component({
    selector: 'app-team-cud-dialog',
    templateUrl: 'team-cud.component.html',
    styleUrls: [ 'team-cud.component.scss' ],
    providers: [ TeamSportService, TeamService ]
})
export class TeamCudComponent implements OnInit {
    @Input() model: Team = new Team();
    @Output() teamUpdated: EventEmitter<Team> = new EventEmitter();
    flagSubmittingTeam = false;
    flagErrorSubmittingTeam = false;

    constructor(private teamService: TeamService, public dialogRef: MdDialogRef<TeamCudComponent>, public snackBar: MdSnackBar) {
    }

    ngOnInit(): void {
    }

    onSubmit() {
        this.flagSubmittingTeam = true;
        this.teamService.postTeam(this.model).then(team => {
            this.model = team;
            this.teamUpdated.emit(this.model);
            this.flagSubmittingTeam = false;
            this.closeDialog();
        }).catch(error => {
            this.flagSubmittingTeam = false;
            this.flagErrorSubmittingTeam = true;
            this.showSnackBar('Team Could Not Be Saved: ' + error.toString());
            this.handleError(error);
        });

    }

    closeDialog() {
        this.dialogRef.close();
    }

    showSnackBar(message: string): void {
        this.snackBar.open(message, null, {duration: 1000});
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
