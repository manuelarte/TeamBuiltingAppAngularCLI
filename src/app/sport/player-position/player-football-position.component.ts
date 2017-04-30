/**
    * @author Manuel
    * @since 20/11/2016
    */
import {Component, OnInit, Input} from "@angular/core";
import {Player} from "../../player";
import {PlayerToTeamSportDetails} from "../../player-to-team-sport-details";
import {TeamSportService} from "../../services/sports-service";
import {TeamSportPosition} from "../../team-sports";


@Component({
    selector: 'player-football-position',
    templateUrl: 'player-football-position.component.html',
    styleUrls: [ 'football-pitch.component.scss' ],
    providers: [ TeamSportService ]
})
export class PlayerFootballPositionComponent implements OnInit {

    @Input() players: Player[];
    @Input() playersDetails: PlayerToTeamSportDetails[];

    private footballPositionMap: {[position: string]: TeamSportPosition} = {};
    positionsMapLoaded: boolean = false;

    constructor(private teamSportService: TeamSportService) {

    }

    ngOnInit(): void {
        this.teamSportService.getTeamSportPositions("Football").then(teamSportPositions => {
            teamSportPositions.forEach(position => this.footballPositionMap[position.abbreviation] = position);
            this.positionsMapLoaded = true;
        })
    }

    getSportPositionForPlayer(player: Player): TeamSportPosition {
        let playerDetails: PlayerToTeamSportDetails = this.getPlayerDetailsFromPlayer(player);
        return this.footballPositionMap[playerDetails.mainPosition];
    }

    private getPlayerDetailsFromPlayer(player: Player): PlayerToTeamSportDetails {
        return this.playersDetails.filter(playerDetail => playerDetail.playerId == player.id)[0];
    }

}
