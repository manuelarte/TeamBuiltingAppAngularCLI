import {Component, OnInit} from "@angular/core";
import {TeamService} from "../services/team.service";
import {StatisticService} from "../services/statistic.service";
import {Team} from "../team";
import {Page} from "../page";
import {TeamStatistic} from "../team-statistic";

@Component({
    selector: 'my-statistics',
    styleUrls: ['./statistics.component.scss'],
    templateUrl: 'statistics.component.html',
    providers: [ TeamService, StatisticService ],
})
export class StatisticsComponent implements OnInit {

    isBusy: boolean = true;
    loadSuccessful: boolean = true;
    teams: Team[] = [];
    teamsStatistics: Page<TeamStatistic>;

    constructor(private teamService: TeamService,
                private statisticService: StatisticService) {}

    ngOnInit(): void {
        this.statisticService.getTeamsMostVisited().then(response => {
            this.teamsStatistics = response;
            for(let entry of response.content) {
                this.teamService.getTeam(entry.teamId).then(team => {
                    this.teams.push(team);
                    this.loadSuccessful = (this.teams.length === response.content.length);
                })
            }
        }).catch(error => {
            this.isBusy = false;
            this.loadSuccessful = false;
        })
    }

    findTeamStatisticsFor(team: Team): TeamStatistic {
        return this.teamsStatistics.content.filter(teamStatistics => teamStatistics.teamId == team.id)[0];
    }

}
