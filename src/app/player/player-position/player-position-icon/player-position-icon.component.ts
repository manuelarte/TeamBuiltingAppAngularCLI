/**
 * Created by Manuel on 20/11/2016.
 */
import {Component, OnInit, Input} from "@angular/core";
import {Player} from "../../../player";
import {TeamSportPosition} from "../../../team-sports";


@Component({
    selector: 'player-position-icon',
    templateUrl: 'player-position-icon.component.html',
    styleUrls: [ 'player-position-icon.component.scss' ],
})
export class PlayerPositionIconComponent implements OnInit {

    @Input() player: Player;

    /**
     * The sport position you want to show for that player
     */
    @Input() teamSportPosition: TeamSportPosition;

    isActive: boolean = false;

    constructor() {}

    ngOnInit(): void {
    }

    getTranslatedPosition(): string {
        let axialCoordinates: AxialCoordinates = this.adjustPositionToHorizontalField(this.teamSportPosition);
        return this.getTranslatedPositionFor(axialCoordinates);
    }

    private adjustPositionToHorizontalField(teamSportPosition: TeamSportPosition): AxialCoordinates {
        return {x: teamSportPosition.y, y: teamSportPosition.x};
    }

    private getTranslatedPositionFor(axialCoordinates: AxialCoordinates): string {
        return `translateX(${Math.round(axialCoordinates.x)}%) 
         translateY(${Math.round(axialCoordinates.y)}%)`;
    }

    changeIsActive(): void {
        this.isActive = !this.isActive;
    }

    getJsPlayerClass(): string {
        return this.addActive('js-player player');
    }

    getPlayerCardStyle(): any {
        return this.isActive ? { 'display': 'block', 'transform': 'translateX(0px) translateY(0px)', 'opacity': 1 }: {};
    }

    getPlayerImgStyle(): any {
        return this.isActive ? { 'transform': 'translateY(-150px)' } : {};
    }

    addActive(className: string): string {
        return !this.isActive ? className : className + ' active';
    }

}

export class MarketInField {
    coordinates: AxialCoordinates
}

export class AxialCoordinates {
    x: number;
    y: number;
}
