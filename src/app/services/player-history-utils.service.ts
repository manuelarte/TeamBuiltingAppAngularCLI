import { Injectable } from '@angular/core';
import {PlayerToTeam} from "../player-to-team";

@Injectable()
export class PlayerHistoryUtilsService {

  constructor() { }

  public getPlayerHistoryPerTeam(playerHistory: PlayerToTeam[]): {[teamId: string]: PlayerToTeam[]} {
      if (!playerHistory) {
          throw "Input cannot be null";
      }
      let toReturn: {[teamId: string]: PlayerToTeam[]} = {};
      playerHistory.forEach(entry => {
          toReturn[entry.teamId] != null ? toReturn[entry.teamId].push(entry) : toReturn[entry.teamId] = [entry];
      });
      return toReturn;
  }
  
  public sortByFromDate(a: PlayerToTeam, b: PlayerToTeam): number {
      if (!a || !b) {
          throw "Input cannot be null";
      }
      return a.fromDate.getTime() - b.fromDate.getTime();
  }

}
