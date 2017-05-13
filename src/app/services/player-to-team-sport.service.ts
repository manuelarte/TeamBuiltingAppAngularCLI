import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {PlayerToTeamSportDetails} from '../player-to-team-sport-details';

@Injectable()
export class PlayerToTeamSportService {

  // Observable string sources
  private playerToTeamSportAddedEventSource = new Subject<PlayerToTeamSportDetails>();
  private playerToTeamSportDeletedEventSource = new Subject<PlayerToTeamSportDetails>();

  // Observable string streams
  playerToTeamSportAddedEvent$ = this.playerToTeamSportAddedEventSource.asObservable();
  playerToTeamSportDeletedEvent$ = this.playerToTeamSportDeletedEventSource.asObservable();

  constructor() { }

  // Service message commands
  playerToTeamSportAddedEvent(playerToTeamSportDetails: PlayerToTeamSportDetails) {
    this.playerToTeamSportAddedEventSource.next(playerToTeamSportDetails);
  }

  playerToTeamSportDeletedEvent(playerToTeamSportDetails: PlayerToTeamSportDetails) {
    this.playerToTeamSportDeletedEventSource.next(playerToTeamSportDetails);
  }

}
