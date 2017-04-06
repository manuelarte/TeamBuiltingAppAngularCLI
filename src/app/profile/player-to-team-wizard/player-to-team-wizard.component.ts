import {Component, ViewChild, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Wizard} from "clarity-angular";
import {PlayerToTeam} from "../../player-to-team";
import {Team} from "../../team";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PlayerService} from "../../services/player.service";
import {Player} from "../../player";

@Component({
  selector: 'app-player-to-team-wizard',
  templateUrl: './player-to-team-wizard.component.html',
  styleUrls: ['./player-to-team-wizard.component.scss'],
  providers: [PlayerService]
})
export class PlayerToTeamWizardComponent implements OnInit {
  @ViewChild("wizard") wizard: Wizard;

  @Input() player: Player;
  @Input() open: boolean = false;
  model: PlayerToTeam = new PlayerToTeam();
  team: Team;
  private playerToTeamForm: FormGroup;
  submitting: boolean = false;
  @Output() entrySaved: EventEmitter<PlayerToTeam> = new EventEmitter<PlayerToTeam>();

  constructor(private playerService: PlayerService) { }

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

  submitEntry(): void {
      this.submitting = true;
      this.playerService.savePlayerToTeam(this.model).then(playerToTeam => {
          this.submitting = false;
          this.model = playerToTeam;
          this.entrySaved.emit(playerToTeam);
          this.wizard.next();
          this.wizard.close();
      }).catch(error => {
          this.submitting = false;
      })
  }

}
