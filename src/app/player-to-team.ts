import {Timeslice} from './timeslice';
export class PlayerToTeam implements Timeslice {
  id: string;
  playerId: number;
  teamId: string;
  fromDate: Date;
  toDate: Date;
}
