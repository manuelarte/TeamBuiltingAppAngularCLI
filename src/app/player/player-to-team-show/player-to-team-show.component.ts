import {Component, Input, OnInit} from '@angular/core';
import {PlayerToTeam} from "../../player-to-team";
import {TeamService} from "../../services/team.service";
import {Team} from "../../team";

@Component({
  selector: 'app-player-to-team-show',
  templateUrl: './player-to-team-show.component.html',
  styleUrls: ['./player-to-team-show.component.scss']
})
export class PlayerToTeamShowComponent implements OnInit {

  @Input() playerToTeam: PlayerToTeam = new PlayerToTeam();
  team: Team;
  loadingTeamFlag: boolean = false;
  errorLoadingTeam: boolean = false;

  constructor(private teamService: TeamService) { }

  ngOnInit() {
      if (this.playerToTeam.teamId) {
        this.loadingTeamFlag = true;
        this.teamService.getTeam(this.playerToTeam.teamId).then(team => {
            this.team = team;
            this.loadingTeamFlag = false;
            this.errorLoadingTeam = false;
        }).catch(error => {
            this.loadingTeamFlag = false;
            this.errorLoadingTeam = true;
        })
      }
  }

}
