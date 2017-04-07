import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TeamSport, TeamSportPosition} from "../../team-sports";
import {TeamSportService} from "../../services/sports-service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PlayerToTeamSportDetails} from "../../player-to-team-sport-details";
import {Player} from "../../player";

@Component({
  selector: 'app-player-to-sport-details-cud',
  templateUrl: './player-to-sport-details-cud.component.html',
  styleUrls: ['./player-to-sport-details-cud.component.scss'],
  providers: [TeamSportService]
})
export class PlayerToSportDetailsCudComponent implements OnInit {

  @Input() player: Player;
  @Input() model: PlayerToTeamSportDetails = new PlayerToTeamSportDetails();
  sports: TeamSport[];
  isBusyLoadingSports: boolean = true;
  @Output() entrySaved: EventEmitter<PlayerToTeamSportDetails> = new EventEmitter<PlayerToTeamSportDetails>();

  sportDetailsForm: FormGroup = new FormGroup({
        sport: new FormControl('', Validators.required),
        mainPosition: new FormControl('', Validators.required),
  });
  @Output() form: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();


  constructor(private teamSportService: TeamSportService) { }

  ngOnInit() {
      this.model.playerId = this.player.id;
      this.teamSportService.getTeamSportsAvailable().then(sports => {
          this.isBusyLoadingSports = false;
          this.sports = sports;
      }).catch(error => {
          this.isBusyLoadingSports = false;
      })
  }

  isErrorLoadingSports(): boolean {
      return this.isBusyLoadingSports == false && this.sports == null;
  }

  emitForm(): void {
    this.form.emit(this.sportDetailsForm);
  }

  getPositions(sportName: string): TeamSportPosition[] {
      return this.sports.filter(sport => sport.name == sportName)[0].sportPositions;
  }

}
