import { Component, OnInit }      from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Location }               from '@angular/common';
import {TeamService} from "../../services/team.service";
import {PlayerService} from "../../services/player.service";
import {Player} from "../../player";
import {PlayerToTeam} from "../../player-to-team";
import {PlayerToTeamSportDetails} from "../../player-to-team-sport-details";
import {Team} from "../../team";
import {PlayerHistoryUtilsService} from "../../services/player-history-utils.service";


@Component({
  selector: 'player-detail',
  templateUrl: 'player-detail.component.html',
  styleUrls: ['player-detail.component.scss'],
  providers: [PlayerService, TeamService, PlayerHistoryUtilsService]
})
export class PlayerDetailComponent implements OnInit {
  player: Player;
  playerLoaded: boolean = false;

  playerHistory: PlayerToTeam[];
  playerHistoryLoaded: boolean = false;

  playerToTeamSport: {[sport: string]: PlayerToTeamSportDetails};
  playerToTeamSportLoaded: boolean = false;
  sportSelected: string;

  teams: Team[] = [];
  teamsLoaded: boolean = false;

  constructor(
    private playerService: PlayerService,
    private teamService: TeamService,
    private playerHistoryUtilsService: PlayerHistoryUtilsService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];

      this.playerService.getPlayer(id).then(player => {
            this.player = player;
            this.playerLoaded = true;
        }).catch(error => {
            this.playerLoaded = true;
            this.handleError;
      });

      this.playerService.getPlayerHistory(id).then(playerHistory => {
            this.playerHistory = playerHistory;
            this.playerHistoryLoaded = true;
            playerHistory.forEach(entry => {
                this.teamService.getTeam(entry.teamId).then(team => {
                    this.teams.push(team);
                    this.teamsLoaded = this.teams.length == playerHistory.length;
                })
            })
      }).catch(error => {
            this.playerHistoryLoaded = true;
      });

      this.playerService.getPlayerToTeamSportDetails(id).then(playerToTeamSportsDetails => {
            this.playerToTeamSport = this.createDict(playerToTeamSportsDetails);
            this.playerToTeamSportLoaded = true;
      }).catch(error => {
            this.playerToTeamSportLoaded = true;
      });

    });

  }

  public areTeamsLoaded(): boolean {
      if (this.playerHistory) {
        let teamIdAndPlayerHistory: {[teamId: string]: PlayerToTeam[]} = this.playerHistoryUtilsService.getPlayerHistoryPerTeam(this.playerHistory);
        return this.teams.length == Object.keys(teamIdAndPlayerHistory).length;
      } else {
          return true
      }
  }

  isEverythingLoaded(): boolean {
      return this.playerLoaded && this.playerHistoryLoaded && this.playerToTeamSportLoaded && this.areTeamsLoaded();
  }

  private createDict(playerToTeamSportsDetails: PlayerToTeamSportDetails[]): {[sport: string]: PlayerToTeamSportDetails} {
      const toReturn: {[sport: string]: PlayerToTeamSportDetails} = {};
      playerToTeamSportsDetails.forEach(entry => {
          toReturn[entry.sport] = entry;
          if (!this.sportSelected) {
              this.sportSelected = entry.sport;
          }
      });
      return toReturn;
  }

  indexTeams(): {[id: string]: Team} {
      return this.teams.reduce(function(map, obj) {
          map[obj.id] = obj;
          return map;
      }, {});
  }

  goBack(): void {
    this.location.back();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  removePlayerToTeamEntry(playerToTeam: PlayerToTeam): void {
      const index: number = this.playerHistory.indexOf(playerToTeam, 0);
      this.playerHistory.splice(index, 1);
  }

}
