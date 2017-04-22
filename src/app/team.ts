import {Timeslice} from "./timeslice";

export class Team implements Timeslice {
  id: string;
  name: string;
  location: string;
  sport: string;
  bio: string;
  fromDate: Date;
  toDate: Date;
  emblemLink: string;
}
