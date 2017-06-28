import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../player';

@Component({
  selector: 'app-match-player-info',
  templateUrl: './match-player-info.component.html',
  styleUrls: ['./match-player-info.component.scss'],
  providers: []
})
export class MatchPlayerInfoComponent implements OnInit {

    @Input() player: Player;

    constructor() { }

    ngOnInit() {
    }

}
