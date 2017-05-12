import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {PlayerToTeam} from '../player-to-team';

@Injectable()
export class PlayerHistoryService {

  // Observable string sources
  private playerToTeamAddedEventSource = new Subject<PlayerToTeam>();
  private playerToTeamDeletedEventSource = new Subject<PlayerToTeam>();

  // Observable string streams
  playerToTeamAddedEvent$ = this.playerToTeamAddedEventSource.asObservable();
  playerToTeamDeletedEvent$ = this.playerToTeamDeletedEventSource.asObservable();

  constructor() { }

  // Service message commands
  playerToTeamAddedEvent(playerToTeam: PlayerToTeam) {
    playerToTeam.fromDate = new Date(playerToTeam.fromDate);
    playerToTeam.toDate = new Date(playerToTeam.toDate);
    this.playerToTeamAddedEventSource.next(playerToTeam);
  }

  playerToTeamDeletedEvent(playerToTeam: PlayerToTeam) {
    this.playerToTeamDeletedEventSource.next(playerToTeam);
  }

}
