/**
 * Created by Manuel on 20/11/2016.
 */
import {Component, OnInit, Input} from "@angular/core";
import {Player} from "../../player";
import {PlayerToTeamSportDetails} from "../../player-to-team-sport-details";
import {TeamSportPosition} from "../../team-sports";
import {TeamSportService} from "../../services/sports-service";


@Component({
    selector: 'player-futsal-position',
    templateUrl: 'player-football-position.component.html',
    styleUrls: [ 'futsal-pitch.component.scss' ],
    providers: [TeamSportService]
})
export class PlayerFutsalPositionComponent implements OnInit {

    @Input() players: Player[];
    @Input() playersDetails: PlayerToTeamSportDetails[];

    private futsalPositionMap: {[position: string]: TeamSportPosition} = {};
    private positionsMapLoaded: boolean = false;

    constructor(private teamSportService: TeamSportService) {}

    ngOnInit(): void {
        this.teamSportService.getTeamSportPositions("Futsal").then(teamSportPositions => {
            teamSportPositions.forEach(position => {
                this.futsalPositionMap[position.abbreviation] = position
            });
            this.positionsMapLoaded = true;
        })
    }

    getSportPositionForPlayer(player: Player): TeamSportPosition {
        let playerDetails: PlayerToTeamSportDetails = this.getPlayerDetailsFromPlayer(player);
        return this.futsalPositionMap[playerDetails.mainPosition];
    }

    private getPlayerDetailsFromPlayer(player: Player): PlayerToTeamSportDetails {
        return this.playersDetails.filter(playerDetail => playerDetail.playerId == player.id)[0];
    }

}
