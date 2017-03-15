import {Component, OnInit, Input} from '@angular/core';
import {Team} from "../../team";

@Component({
    selector: 'app-team-detail-sport-intro',
    templateUrl: 'team-detail-sport-intro.component.html',
    styleUrls: ['team-detail-sport-intro.component.scss']
})
export class TeamDetailSportIntroComponent implements OnInit {

    @Input() team: Team = new Team();

    constructor() {
    }

    ngOnInit(): void {
    }

    getFromYear(): number {
        return this.team.fromDate.getFullYear();
    }

    getToYear(): number {
        return this.team.toDate.getFullYear();
    }

}
