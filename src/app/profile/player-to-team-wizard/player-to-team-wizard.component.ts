import {Component, ViewChild, OnInit, Input} from '@angular/core';
import {Wizard} from "clarity-angular";
import {PlayerToTeam} from "../../player-to-team";
import {Team} from "../../team";

@Component({
  selector: 'app-player-to-team-wizard',
  templateUrl: './player-to-team-wizard.component.html',
  styleUrls: ['./player-to-team-wizard.component.scss']
})
export class PlayerToTeamWizardComponent implements OnInit {
  @ViewChild("wizard") wizard: Wizard;

  @Input() open: boolean = false;
  model: PlayerToTeam = new PlayerToTeam();
  team: Team;

  constructor() { }

  ngOnInit() {
  }

  public setTeam(team: Team): void {
      this.team = team;
  }

}
