import { Component, OnInit }      from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Location }               from '@angular/common';
import {TeamService} from "../../services/team.service";
import {SeasonUtilService, Season} from "../../services/season-utils.service";
import {Player} from "../../player";
import {Team} from "../../team";


@Component({
  moduleId: module.id,
  selector: 'team-detail',
  templateUrl: 'team-detail.component.html',
  styleUrls: ['team-detail.component.css'],
  providers: [TeamService, SeasonUtilService]
})
export class TeamDetailComponent implements OnInit {
  team: Team;
  players: Player[];
    /**
     * The period of time you want to see the team
     */
    date: Date;
    private seasonStartsInMonth: number = 8; // September
    season: Season;

  constructor(
    private teamService: TeamService,
    private seasonUtilService: SeasonUtilService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
      this.route.queryParams.forEach((params: Params) => {
          let date: string = params['date'];
          this.date = date ? new Date(date) : new Date();
          this.route.params.forEach((params: Params) => {
              let id = params['id'];
              this.teamService.getTeam(id)
                  .then(team => this.team = team).catch(this.handleError);
              this.teamService.getPlayers(id, date)
                  .then(players => this.players = players).catch(this.handleError);
          });
          this.season = this.seasonUtilService.getSeasonForDate(this.date, this.seasonStartsInMonth);
      });
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
      let endDate: Date = this.team.toDate ? this.team.toDate : new Date();
      let endYear: number = endDate.getMonth() < this.seasonStartsInMonth ? endDate.getFullYear() : endDate.getFullYear() + 1;
      let years: number[] = this.seasonUtilService.getYearsBetweenTwoYears(this.team.fromDate.getFullYear(), endYear);
      let toReturn: string[] = [];
      years.forEach(year => {
          toReturn.push(year - 1 + "-" + year)
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

}
