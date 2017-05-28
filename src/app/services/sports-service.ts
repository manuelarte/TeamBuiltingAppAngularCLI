import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {TeamSport, TeamSportPosition} from '../team-sports';
import {environment} from '../../environments/environment';
/**
    * @author Manuel
    * @since 20/11/2016
    */
@Injectable()
export class TeamSportService {

    private backendUrl = `${environment.backendSportsUrl}`;
    private teamSportsUrl = this.backendUrl + '/';
    public sportToIcon: Map<string, string> = new Map<string, string>();

    constructor(private http: Http) {
        this.sportToIcon.set('Football', 'football_field');
        this.sportToIcon.set('Futsal', 'futsal_pitch');
    }

    getTeamSportsAvailable(): Promise<TeamSport[]> {
        return this.http.get(this.teamSportsUrl).map(response => <TeamSport[]> response.json())
            .toPromise();
    }

    getTeamSportPositions(teamSportName: string): Promise<TeamSportPosition[]> {
        return this.http.get(`${this.teamSportsUrl}/${teamSportName}`).map(response => <TeamSportPosition[]> response.json())
            .toPromise();
    }


}
