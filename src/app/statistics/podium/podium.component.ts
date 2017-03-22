import {Component, OnInit, Input} from "@angular/core";
import {Team} from "../../team";

@Component({
    selector: 'my-podium',
    styleUrls: ['./podium.component.scss'],
    templateUrl: 'podium.component.html',
    providers: [ ],
})
export class PodiumComponent implements OnInit {

    @Input() teams: Team[] = [];

    constructor() {}

    ngOnInit(): void {
    }

}
