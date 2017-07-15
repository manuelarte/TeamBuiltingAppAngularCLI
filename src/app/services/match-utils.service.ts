import { Injectable } from '@angular/core';
import {TeamInfo} from '../match/teamInfo';
import {PlayerInfo} from '../match/playerInfo';
import {UUID} from 'angular2-uuid';
import {Match} from '../match/match';
import {MatchPart} from '../match/match-part';

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

  getMatchParts(match: Match): MatchPart[] {
      if (match.matchParts) {
        return match.matchParts.sort((d1, d2) => new Date(d1.startingTime).getTime() - new Date(d2.startingTime).getTime());
      } else {
        return null;
      }
  }

}
