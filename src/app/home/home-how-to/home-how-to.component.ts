import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {animate, state, style, transition, trigger } from '@angular/animations'
import {MenuItem} from "primeng/primeng";
import {Auth} from "../../services/auth-service";

@Component({
  selector: 'home-how-to',
  styleUrls: ['home-how-to.component.scss'],
  templateUrl: 'home-how-to.component.html',
  providers: [  ],
  animations: [
        trigger('slideIn', [
            state('*', style({
                '-ms-transform': 'translate3D(0px, 0px, 0px)',
                '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                '-moz-transform': 'translate3D(0px, 0px, 0px)',
                '-o-transform':'translate3D(0px, 0px, 0px)',
                transform:'translate3D(0px, 0px, 0px)',
                opacity: 1})),
            transition('void => *', [
                style({opacity: 0,
                    '-ms-transform': 'translate3D(0px, 150px, 0px)',
                    '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                    '-moz-transform': 'translate3D(0px, 150px, 0px)',
                    '-o-transform':'translate3D(0px, 150px, 0px)',
                    transform:'translate3D(0px, 150px, 0px)',
                }),
                animate('1.3s 0.25s ease-out')
            ])
        ]),
  ],
  encapsulation: ViewEncapsulation.None
})
export class HomeHowToComponent implements OnInit {

    private items: MenuItem[];

	activeIndex: number = 0;

    constructor(private auth: Auth) {}

    ngOnInit() {
        this.items = [{
            label: 'Introduction',
            command: (event: any) => {
                this.activeIndex = 0;
            }
        }, {
           label: 'Log in',
           disabled: this.auth.authenticated(),
           command: (event: any) => {
                this.activeIndex = 1;
           },

        }, {
           label: 'what-to-do',
           command: (event: any) => {
                this.activeIndex = 2;
           }
        }];
    };

}
