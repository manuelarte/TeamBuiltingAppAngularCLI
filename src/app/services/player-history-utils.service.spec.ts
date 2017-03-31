import { TestBed, inject } from '@angular/core/testing';

import { PlayerHistoryUtilsService } from './player-history-utils.service';
import {PlayerToTeam} from "../player-to-team";

describe('PlayerHistoryUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerHistoryUtilsService]
    });
  });

  it('should ...', inject([PlayerHistoryUtilsService], (service: PlayerHistoryUtilsService) => {
    expect(service).toBeTruthy();
  }));

  it('return the map', inject([PlayerHistoryUtilsService], (service: PlayerHistoryUtilsService) => {
    let playerToTeam1: PlayerToTeam = {id: "", playerId: "playerId", teamId: "team1", fromDate: new Date(), toDate: new Date()};
    let playerToTeam2: PlayerToTeam = {id: "", playerId: "playerId", teamId: "team2", fromDate: new Date(), toDate: new Date()};
    let playerHistory: PlayerToTeam[] = [playerToTeam1, playerToTeam2];
    let playerHistoryPerTeam: {[teamId: string]: PlayerToTeam[]} = service.getPlayerHistoryPerTeam(playerHistory);
    expect(playerHistoryPerTeam["team1"].length).toBe(1);
    expect(playerHistoryPerTeam["team2"].length).toBe(1);
  }));

});
