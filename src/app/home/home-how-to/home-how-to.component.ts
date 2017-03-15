import {Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';

@Component({
  selector: 'app-home-how-to',
  templateUrl: 'home-how-to.component.html',
  styleUrls: ['home-how-to.component.scss'],
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
    ]
})
export class HomeHowToComponent implements OnInit {

  tabSelected: string = "introduction";

  constructor() { }

  ngOnInit() {
  }

}
