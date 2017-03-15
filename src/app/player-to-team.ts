import {Timeslice} from "./timeslice";
export class PlayerToTeam implements Timeslice {
  id: string;
  playerId: string;
  teamId: string;
  fromDate: Date;
  toDate: Date;
}
