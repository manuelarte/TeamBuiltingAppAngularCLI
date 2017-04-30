import { Injectable } from '@angular/core';

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

}
