import {Timeslice} from "./timeslice";
export class PlayerReward implements Timeslice {
    id: string;
    userId: string;
    teamId: string;
    playerId: string;
    reward: string;
    comment: string;
    fromDate: Date;
    toDate: Date;
}
