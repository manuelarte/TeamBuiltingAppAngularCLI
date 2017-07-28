import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Location } from '@angular/common';
import {TeamService} from '../../services/team.service';
import {SeasonUtilService, Season} from '../../services/season-utils.service';
import {Player} from '../../player';
import {Team} from '../../team';
import {PlayerToTeam} from '../../player-to-team';
import {PlayerService} from '../../services/player.service';
import {ExceptionMessageBackend} from '../../exception-message-backend';


@Component({
  selector: 'app-team-detail',
  templateUrl: 'team-detail.component.html',
  styleUrls: ['team-detail.component.scss'],
  providers: [TeamService, PlayerService, SeasonUtilService]
})
export class TeamDetailComponent implements OnInit {
  teamLoadingFlag = true;
  errorTeamLoadingFlag = false;
  team: Team;

  loadingPlayersToTeam = true;
  errorLoadingPlayersToTeam = false;
  playersToTeam: PlayerToTeam[];

  players: Player[];

  /**
   * The period of time you want to see the team
  */
  date: Date;
  private seasonStartsInMonth = 8; // September
  season: Season;

  constructor(
    private teamService: TeamService,
    private playerService: PlayerService,
    private seasonUtilService: SeasonUtilService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
      this.route.queryParams.forEach((params: Params) => {
          const date: string = params['date'];
          this.date = date ? new Date(date) : new Date();
          this.route.params.forEach((params: Params) => {
              const id = params['id'];

              this.teamLoadingFlag = true;
              this.teamService.getTeam(id)
                  .then(team => {
                    this.team = team;
                    this.teamLoadingFlag = false;
                  }).catch(error => {
                    this.teamLoadingFlag = false;
                    this.errorTeamLoadingFlag = true;
                    this.handleError(error);
                    this.forwardError(error.json());
              });
              this.loadingPlayersToTeam = true;
              this.teamService.getPlayers(id, this.date)
                  .then(playersToTeam => {
                      this.playersToTeam = playersToTeam;
                      this.loadingPlayersToTeam = false;
                      this.players = [];
                      this.playersToTeam.forEach(playerToTeam => {
                          this.playerService.getPlayer(playerToTeam.playerId).then(player => {
                              this.players.push(player);
                          });
                      });
                  }).catch(error => {
                      this.loadingPlayersToTeam = false;
                      this.errorLoadingPlayersToTeam = true;
                      this.handleError(error);
                  });
          });
          this.season = this.seasonUtilService.getSeasonForDate(this.date, this.seasonStartsInMonth);
      });
  }

  getPlayerIds(): number[] {
      const playerIds: number[] = [];
      this.playersToTeam.filter(playerToTeam => {
          if (playerIds.indexOf(playerToTeam.playerId) < 0) {
              playerIds.push(playerToTeam.playerId);
          }
      });
      return playerIds;
  }

  getFromYear(): number {
    return this.team.fromDate.getFullYear();
  }

  getToYear(): number {
      return this.team.toDate.getFullYear();
  }

  getCurrentSeason(): string {
      return `${this.season.startDate.getFullYear()}-${this.season.endDate.getFullYear()}`;
  }

  getSeasons(): string[] {
      const endDate: Date = this.team.toDate ? this.team.toDate : new Date();
      const endYear: number = endDate.getMonth() < this.seasonStartsInMonth ? endDate.getFullYear() : endDate.getFullYear() + 1;
      const years: number[] = this.seasonUtilService.getYearsBetweenTwoYears(this.team.fromDate.getFullYear(), endYear);
      const toReturn: string[] = [];
      years.forEach(year => {
          toReturn.push(year - 1 + '-'  + year);
      });
      return toReturn;
  }

  goBack(): void {
    this.location.back();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private forwardError(error: ExceptionMessageBackend) {
      if (error.errorCode) {
          const link = ['/error', error.errorCode];
          this.router.navigate(link);
      }
  }

}
