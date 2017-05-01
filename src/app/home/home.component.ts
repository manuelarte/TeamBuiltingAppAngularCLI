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
              '-ms-transform': 'translate3D(0px, 0px, 0px)',
              '-webkit-transform': 'translate3D(0px, 0px, 0px)',
              '-moz-transform': 'translate3D(0px, 0px, 0px)',
              '-o-transform': 'translate3D(0px, 0px, 0px)',
              transform: 'translate3D(0px, 0px, 0px)',
              opacity: 1})),
          transition('void => *', [
              style({opacity: 0,
                  '-ms-transform': 'translate3D(0px, 150px, 0px)',
                  '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                  '-moz-transform': 'translate3D(0px, 150px, 0px)',
                  '-o-transform': 'translate3D(0px, 150px, 0px)',
                  transform: 'translate3D(0px, 150px, 0px)',
              }),
              animate('1.3s 0.25s ease-out')
          ])
      ]),
  ]
})
export class HomeComponent implements OnInit {

    images: any[];
    mostVisitedTeams: Team[] = [];
    mostVisitedTeamsLoaded = false;

    constructor(
        private teamService: TeamService,
        private statisticService: StatisticService,
        public routerUtils: RouterUtilsService) {}

    ngOnInit() {
        this.images = [];
        this.images.push({source: '../images/home/image1.jpg',
            alt: 'The Sport Network for amateur players!', title: 'Welcome to TeamBuilting'});
        this.images.push({source: '../images/home/image2.jpg',
            alt: 'Log in and Start Registering All your sport career!', title: 'How to Start'});
        this.images.push({source: '../images/home/image3.jpg',
            alt: 'Add the teams you have played in and the period', title: 'Really easy'});
        this.images.push({source: '../images/home/image4.jpg',
            alt: 'Take a look at your sport career in a way you have never done before', title: 'See Your Statistics'});
        this.images.push({source: '../images/home/image5.jpg',
            alt: 'And share it with your friends', title: 'Enjoy'});

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
