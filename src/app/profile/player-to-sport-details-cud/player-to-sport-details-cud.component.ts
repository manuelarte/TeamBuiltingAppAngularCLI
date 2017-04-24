import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TeamSport, TeamSportPosition} from '../../team-sports';
import {TeamSportService} from '../../services/sports-service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlayerToTeamSportDetails} from '../../player-to-team-sport-details';
import {Player} from '../../player';

@Component({
  selector: 'app-player-to-sport-details-cud',
  templateUrl: './player-to-sport-details-cud.component.html',
  styleUrls: ['./player-to-sport-details-cud.component.scss'],
  providers: [TeamSportService]
})
export class PlayerToSportDetailsCudComponent implements OnInit {

    @Input() player: Player;
    @Input() model: PlayerToTeamSportDetails = new PlayerToTeamSportDetails();
    @Input() editing = false;
    sports: TeamSport[];
    isBusyLoadingSports = true;
    @Output() entrySaved: EventEmitter<PlayerToTeamSportDetails> = new EventEmitter<PlayerToTeamSportDetails>();

    sportDetailsForm: FormGroup;
    @Output() form: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();


    constructor(private teamSportService: TeamSportService) {
    }

    ngOnInit() {
        if (this.player) {
            this.model.playerId = this.player.id;
        }
        this.teamSportService.getTeamSportsAvailable().then(sports => {
            this.isBusyLoadingSports = false;
            this.sports = sports;
        }).catch(error => {
            this.isBusyLoadingSports = false;
        });
    }

    isErrorLoadingSports(): boolean {
        return this.isBusyLoadingSports === false && this.sports == null;
    }

    filterTeamSportBySportName(sportName: string): TeamSport[] {
        return this.sports.filter(sport => sport.name === sportName);
    }

    isShowSportField(): boolean {
        if (this.sportDetailsForm && this.sportDetailsForm.valid && this.filterTeamSportBySportName(this.model.sport).length === 1) {
            return this.filterTeamSportBySportName(this.model.sport)[0]
                    .sportPositions.filter(sportPosition => sportPosition.abbreviation === this.model.mainPosition).length === 1;
        } else {
            return false;
        }
    }

    emitForm(form: FormGroup): void {
        this.sportDetailsForm = form;
        this.form.emit(this.sportDetailsForm);
    }

}
