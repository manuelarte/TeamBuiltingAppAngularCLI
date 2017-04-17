import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {TeamSport, TeamSportPosition} from "../team-sports";
import {environment} from "../../environments/environment";
/**
 * Created by Manuel on 20/11/2016.
 */
@Injectable()
export class TeamSportService {

    private backendUrl: string = `${environment.backendSportsUrl}`;
    private teamSportsUrl = this.backendUrl + '/';

    constructor(private http: Http) { }

    getTeamSportsAvailable(): Promise<TeamSport[]> {
        return this.http.get(this.teamSportsUrl).map(response => <TeamSport[]> response.json())
            .toPromise();
    }

    getTeamSportPositions(teamSportName: string): Promise<TeamSportPosition[]> {
        return this.http.get(`${this.teamSportsUrl}/${teamSportName}`).map(response => <TeamSportPosition[]> response.json())
            .toPromise();
    }


}
