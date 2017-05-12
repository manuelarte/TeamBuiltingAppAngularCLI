import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {TeamService} from '../../services/team.service';
import {PlayerService} from '../../services/player.service';
import {Player} from '../../player';
import {PlayerToTeam} from '../../player-to-team';
import {PlayerToTeamSportDetails} from '../../player-to-team-sport-details';
import {Team} from '../../team';
import {PlayerHistoryUtilsService} from '../../services/player-history-utils.service';
import {PlayerHistoryService} from '../../services/player-history.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-player-detail',
  templateUrl: 'player-detail.component.html',
  styleUrls: ['player-detail.component.scss'],
  providers: [PlayerService, TeamService, PlayerHistoryUtilsService]
})
export class PlayerDetailComponent implements OnInit, OnDestroy {
  player: Player;
  playerLoaded = false;

  playerHistory: PlayerToTeam[];
  playerHistoryLoaded = false;

  playerToTeamSport: {[sport: string]: PlayerToTeamSportDetails};
  playerToTeamSportLoaded = false;
  sportSelected: string;

  teams: Team[] = [];
  teamsLoaded = false;

  playerToTeamAddedSubscription: Subscription;
  playerToTeamDeletedSubscription: Subscription;

  constructor(
    private playerService: PlayerService,
    private teamService: TeamService,
    private playerHistoryService: PlayerHistoryService,
    private playerHistoryUtilsService: PlayerHistoryUtilsService,
    private route: ActivatedRoute,
  ) {
    this.playerToTeamAddedSubscription = playerHistoryService.playerToTeamAddedEvent$.subscribe( response => {
      this.playerHistory.push(response);
      this.loadTeamIfNeeded(response.teamId);
    });
    this.playerToTeamDeletedSubscription = playerHistoryService.playerToTeamDeletedEvent$.subscribe( response => {
      this.removePlayerToTeamEntry(response);
    });
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      const id = params['id'];

      this.playerService.getPlayer(id).then(player => {
            this.player = player;
            this.playerLoaded = true;
        }).catch(error => {
            this.playerLoaded = true;
            this.handleError(error);
      });

      this.playerService.getPlayerHistory(id).then(playerHistory => {
            this.playerHistory = playerHistory;
            this.playerHistoryLoaded = true;
            playerHistory.forEach(entry => {
                this.loadTeamIfNeeded(entry.teamId);
            });
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

  loadTeamIfNeeded(teamId: string): void {
    this.teamService.getTeam(teamId).then(team => {
      this.teams.push(team);
      this.teamsLoaded = this.areTeamsLoaded();
    });
  }

  areTeamsLoaded(): boolean {
      if (this.playerHistory) {
        const teamIdAndPlayerHistory: {[teamId: string]: PlayerToTeam[]} =
            this.playerHistoryUtilsService.getPlayerHistoryPerTeam(this.playerHistory);
        return Object.keys(this.indexTeams()).length === Object.keys(teamIdAndPlayerHistory).length;
      } else {
          return true;
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  removePlayerToTeamEntry(playerToTeam: PlayerToTeam): void {
      const index: number = this.playerHistory.indexOf(playerToTeam, 0);
      this.playerHistory.splice(index, 1);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.playerToTeamAddedSubscription.unsubscribe();
    this.playerToTeamDeletedSubscription.unsubscribe();
  }

}
