import {Input, Component, OnInit} from "@angular/core";

import {TeamService} from "../../services/team.service";
import {Team} from "../../team";
/**
 * @author Manuel Doncel Martos
 * @since 09/12/2016.
 */
@Component({
  selector: 'my-admin-teams',
  templateUrl: 'my-admin-teams.component.html',
  styleUrls: ['my-admin-teams.component.css'],
  providers: [ TeamService ]
})
export class MyAdminTeams implements OnInit {

  @Input() teamIds: string[] = [];
  teams: Team[] = [];
  teamsLoaded: boolean = false;

  constructor(private teamService: TeamService) {}

  ngOnInit() {
    for (let teamId of this.teamIds) {
        this.teamService.getTeam(teamId).then(team => {
            this.teams.push(team);
            this.teamsLoaded = this.teamIds.length === this.teams.length;
        })
    }
  }

}
