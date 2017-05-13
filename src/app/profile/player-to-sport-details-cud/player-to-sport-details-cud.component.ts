import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TeamSport} from '../../team-sports';
import {TeamSportService} from '../../services/sports-service';
import {FormGroup} from '@angular/forms';
import {PlayerToTeamSportDetails} from '../../player-to-team-sport-details';
import {Player} from '../../player';
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'app-player-to-sport-details-cud',
  templateUrl: './player-to-sport-details-cud.component.html',
  styleUrls: ['./player-to-sport-details-cud.component.scss'],
  providers: [PlayerService, TeamSportService]
})
export class PlayerToSportDetailsCudComponent implements OnInit {

    @Input() player: Player;
    @Input() model: PlayerToTeamSportDetails = new PlayerToTeamSportDetails();
    @Input() editing = false;
    sports: TeamSport[];
    isBusyLoadingSports = true;
    @Output() entrySaved: EventEmitter<PlayerToTeamSportDetails> = new EventEmitter<PlayerToTeamSportDetails>();

    playerToTeamSportDetails: PlayerToTeamSportDetails[];
    loadingPlayerToTeamSportDetails = false;
    loadingPlayerToTeamSportDetailsError = false;

    sportDetailsForm: FormGroup;
    @Output() form: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();


    constructor(private playerService: PlayerService, private teamSportService: TeamSportService) {
    }

    ngOnInit() {
        if (this.player) {
            this.model.playerId = this.player.id;
        }
        this.teamSportService.getTeamSportsAvailable().then(sports => {
            this.isBusyLoadingSports = false;
            this.sports = sports;
            if (this.player) {
              this.loadPlayerToTeamSportDetails(this.player.id);
            }
        }).catch(error => {
            this.isBusyLoadingSports = false;
        });
    }

    private loadPlayerToTeamSportDetails(playerId: number): void {
        this.loadingPlayerToTeamSportDetails = true;
        this.playerService.getPlayerToTeamSportDetails(playerId).then(playerToTeamSportDetails => {
            this.playerToTeamSportDetails = playerToTeamSportDetails;
            this.loadingPlayerToTeamSportDetails = false;
        }).catch(error => {
            this.loadingPlayerToTeamSportDetails = false;
            this.loadingPlayerToTeamSportDetailsError = true;
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

    isSportRegistered(sportName: string): boolean {
      if (this.playerToTeamSportDetails) {
          return this.playerToTeamSportDetails.filter(playerToTeamSport => playerToTeamSport.sport === sportName).length > 0;
      }
      return false;
    }

}
