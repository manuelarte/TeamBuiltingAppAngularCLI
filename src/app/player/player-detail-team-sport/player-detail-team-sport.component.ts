import {Component, OnInit, Input} from '@angular/core';
import {Player} from "../../player";
import {PlayerToTeamSportDetails} from "../../player-to-team-sport-details";

@Component({
  selector: 'app-player-detail-team-sport',
  templateUrl: 'player-detail-team-sport.component.html',
  styleUrls: ['player-detail-team-sport.component.scss']
})
export class PlayerDetailTeamSportComponent implements OnInit {

    @Input() player: Player;
    @Input() playerToTeamSport: {[sport: string]: PlayerToTeamSportDetails};

    constructor(
    ) {}

    ngOnInit(): void {

    }

    getSportsPlayed(): string[] {
        return Object.keys(this.playerToTeamSport);
    }

}
