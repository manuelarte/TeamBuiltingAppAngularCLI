import {Component, ViewChild, OnInit, Input} from '@angular/core';
import {Wizard} from "clarity-angular";
import {PlayerToTeam} from "../../player-to-team";
import {Team} from "../../team";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'app-player-to-team-wizard',
  templateUrl: './player-to-team-wizard.component.html',
  styleUrls: ['./player-to-team-wizard.component.scss'],
  providers: [PlayerService]
})
export class PlayerToTeamWizardComponent implements OnInit {
  @ViewChild("wizard") wizard: Wizard;

  @Input() open: boolean = false;
  model: PlayerToTeam = new PlayerToTeam();
  team: Team;
  playerToTeamForm: FormGroup;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
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
      console.log("submitting");
      // this.playerService.savePlayerToTeam(this.model).then()
  }

}
