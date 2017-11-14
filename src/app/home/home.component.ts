import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger } from '@angular/animations'
import {TeamService} from '../services/team.service';
import {StatisticService} from '../services/statistic.service';
import {Team} from '../team';
import {RouterUtilsService} from '../services/router-utils.service';
import {Auth} from '../services/auth-service';


@Component({
  styleUrls: ['home.component.scss'],
  templateUrl: 'home.component.html',
  providers: [ Auth, TeamService, StatisticService, RouterUtilsService ],
  animations: [

      trigger('slideIn', [
          state('*', style({
              //'msTransform': 'translate3D(0px, 0px, 0px)',
              'webkitTransform': 'translate3D(0px, 0px, 0px)',
              //'mozTransform': 'translate3D(0px, 0px, 0px)',
              //'oTransform': 'translate3D(0px, 0px, 0px)',
              transform: 'translate3D(0px, 0px, 0px)',
              opacity: 1})),
          transition('void => *', [
              style({opacity: 0,
                  //'msTransform': 'translate3D(0px, 150px, 0px)',
                  'webkitTransform': 'translate3D(0px, 150px, 0px)',
                  //'mozTransform': 'translate3D(0px, 150px, 0px)',
                  //'oTransform': 'translate3D(0px, 150px, 0px)',
                  transform: 'translate3D(0px, 150px, 0px)',
              }),
              animate('1.3s 0.25s ease-out')
          ])
      ]),
  ]
})
export class HomeComponent implements OnInit {

    mostVisitedTeams: Team[] = [];
    mostVisitedTeamsLoaded = false;

    constructor(
        private teamService: TeamService,
        private statisticService: StatisticService,
        public routerUtils: RouterUtilsService) {}

    ngOnInit() {
        this.statisticService.getTeamsMostVisited().then(response => {
            for (const entry of response.content) {
                this.teamService.getTeam(entry.teamId).then(team => {
                    this.mostVisitedTeams.push(team);
                    this.mostVisitedTeamsLoaded = (this.mostVisitedTeams.length === response.content.length);
                });
            }
        });
    }

}
