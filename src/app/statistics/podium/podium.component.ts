import {Component, OnInit, Input} from "@angular/core";
import {Team} from "../../team";

@Component({
    moduleId: module.id,
    selector: 'my-podium',
    styleUrls: ['./podium.component.css'],
    templateUrl: 'podium.component.html',
    providers: [ ],
})
export class PodiumComponent implements OnInit {

    @Input() teams: Team[] = [];

    constructor() {}

    ngOnInit(): void {
    }

}
