import { Injectable } from '@angular/core';
import {TeamInfo} from '../match/teamInfo';
import {PlayerInfo} from '../match/playerInfo';
import {UUID} from 'angular2-uuid';
import {Match} from '../match/match';

@Injectable()
export class MatchUtilsService {

  constructor() { }

  isHomeTeamSelected(match: Match): boolean {
    return match != null && match.homeTeam != null && match.homeTeam.teamInfo != null;
  }

  isAwayTeamSelected(match: Match): boolean {
        return match != null && match.awayTeam != null && match.awayTeam.teamInfo != null;
    }

  getHomeTeam(match: Match): TeamInfo {
      return match.homeTeam.teamInfo;
  }

  getAwayTeam(match: Match): TeamInfo {
    return match.awayTeam.teamInfo;
  }

  areHomePlayersSelected(match: Match): boolean {
    return match != null && match.homeTeam != null && match.homeTeam.selectedPlayers != null;
  }

  areAwayPlayersSelected(match: Match): boolean {
    return match != null && match.awayTeam != null && match.awayTeam.selectedPlayers != null;
  }

  getHomePlayers(match: Match): PlayerInfo[] {
    return match.homeTeam.selectedPlayers;
  }

  getAwayPlayers(match: Match): PlayerInfo[] {
    return match.awayTeam.selectedPlayers;
  }

}
