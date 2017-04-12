import {Component, ViewChild, OnInit, Input, EventEmitter, Output, ChangeDetectorRef} from '@angular/core';
import {Wizard} from "clarity-angular";
import {PlayerToTeam} from "../../player-to-team";
import {Team} from "../../team";
import {FormGroup} from "@angular/forms";
import {PlayerService} from "../../services/player.service";
import {Player} from "../../player";
import {TeamService} from "../../services/team.service";

@Component({
  selector: 'app-player-to-team-wizard',
  templateUrl: './player-to-team-wizard.component.html',
  styleUrls: ['./player-to-team-wizard.component.scss'],
  providers: [TeamService, PlayerService]
})
export class PlayerToTeamWizardComponent implements OnInit {
  @ViewChild("wizard") wizard: Wizard;

  @Input() player: Player;
  @Input() open: boolean = false;
  model: PlayerToTeam = new PlayerToTeam();
  team: Team;
  teamModel: Team = new Team();
  submittingTeam: boolean = false;
  teamSubmitErrorFlag: boolean = false;

  private playerToTeamForm: FormGroup;
  submitting: boolean = false;
  errorSubmittingFlag: boolean = false;
  @Output() entrySaved: EventEmitter<PlayerToTeam> = new EventEmitter<PlayerToTeam>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  constructor(private teamService: TeamService, private playerService: PlayerService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
      this.model.playerId = this.player.id;
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

  teamSelected(addTeam: boolean): void {
      if (addTeam == null || (addTeam == false && this.team)) {
          this.wizard.next();
      } else {
        this.submittingTeam = true;
        this.teamService.postTeamObservable(this.teamModel).subscribe(data => {
          this.submittingTeam = false;
          this.teamSubmitErrorFlag = false
          this.setTeam(data);
          this.teamModel = new Team();
          this.wizard.next();
         }, error => {
          this.submittingTeam = false;
          this.team = null;
          this.teamSubmitErrorFlag = true;
         });
      }

  }

  submitEntry(): void {
      this.submitting = true;
      this.playerService.savePlayerToTeam(this.model).then(playerToTeam => {
          this.submitting = false;
          this.model = playerToTeam;
          this.entrySaved.emit(playerToTeam);
          this.team = null;
          this.wizard.close();
          this.open = false;
          this.errorSubmittingFlag = false;
      }).catch(error => {
          this.submitting = false;
          this.errorSubmittingFlag = true
      })
  }

  closeWizard(): void {
      this.team = null;
      this.onCancel.emit();
      this.open = false;
  }

}
