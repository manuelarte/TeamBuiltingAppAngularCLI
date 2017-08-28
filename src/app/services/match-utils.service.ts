import { Injectable } from '@angular/core';
import {TeamInfo} from '../match/teamInfo';
import {PlayerInfo} from '../match/playerInfo';
import {Match} from '../match/match';
import {MatchPart} from '../match/match-part';
import {GoalMatchEvent, MatchEvent} from '../match/match-events';

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
    if (this.areHomePlayersSelected(match)) {
      return match.homeTeam.selectedPlayers;
    } else {
      return null;
    }
  }

  getAwayPlayers(match: Match): PlayerInfo[] {
    if (this.isAwayTeamSelected(match)) {
      return match.awayTeam.selectedPlayers;
    } else {
      return null;
    }
  }

  getAllPlayers(match: Match): PlayerInfo[] {
    return this.getHomePlayers(match).concat(this.getAwayPlayers(match));
  }

  getMatchParts(match: Match): MatchPart[] {
      if (match.matchParts) {
        return match.matchParts.sort((d1, d2) => new Date(d1.startingTime).getTime() - new Date(d2.startingTime).getTime());
      } else {
        return null;
      }
  }

  getHomeTeamGoals(match: Match): MatchEvent[] {
    if (this.isHomeTeamSelected(match)) {
      return this.getGoalsForTeamId(this.getHomeTeam(match).id, match);
    }
    return [];
  }

  getAwayTeamGoals(match: Match): MatchEvent[] {
    if (this.isAwayTeamSelected(match)) {
      return this.getGoalsForTeamId(this.getAwayTeam(match).id, match);
    }
    return [];
  }

  private getGoalsForTeamId(teamId: string, match: Match): MatchEvent[] {
    const teamIdGoals: MatchEvent[] = [];
    if (match.events) {
      match.events.filter(event => event.goal && (<GoalMatchEvent>event).goal.teamThatScored === teamId).forEach(goalEvent => {
          teamIdGoals.push(goalEvent);
      });
    }
    return teamIdGoals;
  }

  getMatchEventType(matchEvent: MatchEvent): string {
    return Object.getOwnPropertyNames(matchEvent)[0];
  }

  isMatchReadyForMatchFeedback(match: Match): boolean {
    return this.isHomeTeamSelected(match) && this.isAwayTeamSelected(match) && this.areHomePlayersSelected(match)
        && this.areAwayPlayersSelected(match);
  }

  isRegisteredPlayer(playerInfo: PlayerInfo): boolean {
    return 'playerId' in playerInfo;
  }

}
