import {Injectable} from '@angular/core';
import {TeamSport, TeamSportPosition} from '../team-sports';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
/**
    * @author Manuel Doncel Martos
    * @since 20/11/2016
    */
@Injectable()
export class TeamSportService {

    private backendUrl = `${environment.backendSportsUrl}`;
    private teamSportsUrl = this.backendUrl + '/';
    public sportToIcon: Map<string, string> = new Map<string, string>();

    constructor(private httpClient: HttpClient) {
        this.sportToIcon.set('Football', 'football_field');
        this.sportToIcon.set('Futsal', 'futsal_pitch');
    }

    getTeamSportsAvailable(): Promise<TeamSport[]> {
        return this.httpClient.get<TeamSport[]>(this.teamSportsUrl).toPromise();
    }

    getTeamSportPositions(teamSportName: string): Promise<TeamSportPosition[]> {
        return this.httpClient.get<TeamSportPosition[]>(`${this.teamSportsUrl}/${teamSportName}`).toPromise();
    }


}
