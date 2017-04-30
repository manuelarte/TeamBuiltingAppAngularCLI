import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {PlayerToTeam} from "../../player-to-team";
import {Team} from "../../team";
import {FormGroup} from "@angular/forms";
import {PlayerService} from "../../services/player.service";
import {Player} from "../../player";
import {TeamService} from "../../services/team.service";
import {MdDialogRef, MdSnackBar} from "@angular/material";
import {UserDataService} from "../../services/user-data.service";

@Component({
  selector: 'app-player-to-team-wizard',
  templateUrl: './player-to-team-wizard.component.html',
  styleUrls: ['./player-to-team-wizard.component.scss'],
  providers: [TeamService, PlayerService, UserDataService]
})
export class PlayerToTeamWizardComponent implements OnInit {

  theTeamForm: FormGroup;
  player: Player;
  model: PlayerToTeam = new PlayerToTeam();
  team: Team;
  teamModel: Team = new Team();
  submittingTeam = false;
  teamSubmitErrorFlag = false;

  private playerToTeamForm: FormGroup;
  submitting = false;
  errorSubmittingFlag = false;
  @Output() entrySaved: EventEmitter<PlayerToTeam> = new EventEmitter<PlayerToTeam>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  constructor(private teamService: TeamService, private playerService: PlayerService, private userDataService: UserDataService,
              public dialogRef: MdDialogRef<PlayerToTeamWizardComponent>, public snackBar: MdSnackBar) { }

  ngOnInit() {
      this.userDataService.getUserPlayerData().then(userData => {
          this.playerService.getPlayer(userData.playerId).then(player => {
              this.player = player;
              this.model.playerId = this.player.id;
          });
      });
  }

  public setTeam(team: Team): void {
      this.team = team;
      this.model.teamId = this.team.id;
  }

  isValidForm(): boolean {
      return this.playerToTeamForm ? this.playerToTeamForm.valid : false;
  }

  setPlayerToTeamForm(form: FormGroup): void {
      this.playerToTeamForm = form;
  }

  submitEntry(): void {
      this.submitting = true;
      this.playerService.savePlayerToTeam(this.model).then(playerToTeam => {
          this.submitting = false;
          this.model = playerToTeam;
          this.entrySaved.emit(playerToTeam);
          this.team = null;
          this.errorSubmittingFlag = false;
          this.showSnackBar('Entry Saved');
          this.dialogRef.close();
      }).catch(error => {
          this.submitting = false;
          this.errorSubmittingFlag = true;
          this.showSnackBar('Error Saving Entry: ' + error.toString());
      })
  }

  cancel(): void {
      this.team = null;
      this.onCancel.emit();
      this.dialogRef.close();
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, null, {duration: 2000});
  }

}
