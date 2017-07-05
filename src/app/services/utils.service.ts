import { Injectable } from '@angular/core';
import {TeamInfo} from '../match/teamInfo';
import {PlayerInfo} from '../match/playerInfo';
import {UUID} from 'angular2-uuid';

@Injectable()
export class UtilsService {

  constructor() { }

  getPictureBasedOnSport(sportName: string): string {
    if (!sportName) {
        throw new Error('The sportname cannot be null');
    }
    let pictureUrl = '../../images/sports/football.jpg';
    switch (sportName) {
        case 'Football': {
          pictureUrl = '../../images/sports/football.jpg';
          break;
        }
        case 'Futsal': {
            pictureUrl = '../../images/sports/futsal.jpg';
          break;
        }
        default: {
          // statements;
          break;
        }
    }
    return pictureUrl;
  }

  isRegisteredTeam(teamInfo: TeamInfo): boolean {
    return 'teamId' in teamInfo;
  }

  isRegisteredPlayer(playerInfo: PlayerInfo): boolean {
        return 'playerId' in playerInfo;
  }

  /**
   * Returns a random id
   * @returns {string}
   */
  guidGenerator(): string {
    return UUID.UUID();
  }

}
