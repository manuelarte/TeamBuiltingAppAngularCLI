import {Component, OnInit, Input}      from '@angular/core';
import {Team} from "../../../team";
import {Player} from "../../../player";
import {PlayerToTeam} from "../../../player-to-team";
import {PlayerToTeamSportDetails} from "../../../player-to-team-sport-details";

@Component({
  selector: 'player-detail-statistics',
  templateUrl: 'player-detail-statistics.component.html',
  styleUrls: ['player-detail-statistics.component.scss'],
  providers: [ ]
})
export class PlayerDetailStatisticsComponent implements OnInit {
  @Input() player: Player = new Player();
  @Input() playerHistory: PlayerToTeam[] = [];
  @Input() teams: Team[] = [];
  @Input() playerToTeamSport: {[sport: string]: PlayerToTeamSportDetails} = {};

  dataTimeInTheTeams: any;
  optionsTimeInTheTeams: any;

  dataNumberOfTeamsPerSport: any;//{labels: string[], datasets: {data: number[], backgroundColor: string[], hoverBackgroundColor: string[]}[]};
  optionsTeamsPerSport: any;
  // optionsDaysInTheTeams: any;

  dataLoaded: boolean = false;

  constructor() {}

  ngOnInit(): void {
      this.dataTimeInTheTeams = this.getDataTimeInTheTeam();
      this.optionsTimeInTheTeams = {
          tooltips: {
              callbacks: {
                  label: function(tooltipItem, data) {
                      let label = data.labels[tooltipItem.index];
                      let time = data.datasets[0].data[tooltipItem.index];

                      let day: number = 1000 * 60 * 60 * 24;
                      let days = Math.floor(time/day);
                      let months = Math.floor(days/31);
                      let years: number = Math.floor(months/12);
                      let spareMonths: number = Math.abs(((years*12)-months));
                      let spareDays: number = Math.abs((months*31) - days);
                      return label + ': ' + years + " years " + spareMonths + " months " + spareDays + " days";
                  }
              }
          }
      };

      this.dataNumberOfTeamsPerSport = this.getDataNumberOfTeamsPerSport();

      this.dataLoaded = true;
  }

  private getDataTimeInTheTeam(): any {
      let labels: string[] = this.getDataTimeInTheTeamsValue()["labels"];
      let data: number[] = this.getDataTimeInTheTeamsValue()["data"];
      return {
          labels: labels,
              datasets: [{
          data: data,
          backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#00CC99",
          ],
          hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#00CC99"
          ]
      }]
      };
  }

  private getDataTimeInTheTeamsValue(): {labels: string[], data: number[]} {
    let labels: string[] = [];
    let data: number[] = [];
    this.playerHistory.forEach(entry => {
        labels.push(this.getTeamOfId(entry.teamId).name);
        data.push(this.getValue(entry));
    });
    return {labels: labels, data: data};
  }

  private getDataNumberOfTeamsPerSport(): any {
      let labels: string[] = this.getSportsPlayedValue()["labels"];
      let data: number[] = this.getSportsPlayedValue()["data"];
      return {
          labels: labels,
          datasets: [{
              data: data,
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#00CC99",
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#00CC99"
              ]
          }]
      };
  }

  private getSportsPlayedValue(): {labels: string[], data: number[]} {
      let dict: {[sport: string]: number} = {};
      this.playerHistory.forEach(entry => {
          dict[this.getTeamOfId(entry.teamId).sport] = dict[this.getTeamOfId(entry.teamId).sport] ? dict[this.getTeamOfId(entry.teamId).sport] + 1 : 1;
      });
      return {labels: Object.keys(dict), data: Object.values(dict)};
  }

  private getTeamsForSport(sport: string): Team[] {
      return this.playerHistory.filter(entry => sport == this.getTeamOfId(entry.teamId).sport).map(entry => this.getTeamOfId(entry.teamId));
  }

  private getTeamOfId(teamId: string): Team {
      return this.teams.filter(team => team.id === teamId)[0]
  }

  private getValue(playerToTeam: PlayerToTeam): number {
      let endDate: Date = playerToTeam.toDate ? playerToTeam.toDate : new Date();
      return endDate.getTime() - playerToTeam.fromDate.getTime();
  }

  private calcDifferenceInDays(date1: Date,date2: Date): {years: number, months: number, days: number} {
    let diff = Math.floor(date1.getTime() - date2.getTime());
    let day: number = 1000 * 60 * 60 * 24;

    let days = Math.floor(diff/day);
    let months = Math.floor(days/31);
    let years: number = Math.floor(months/12);

    return {years: years, months: months, days: days};
  }

}
