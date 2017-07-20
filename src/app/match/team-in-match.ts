import {TeamInfo} from './teamInfo';
import {PlayerInfo} from './playerInfo';

export class TeamInMatch {
    teamInfo: TeamInfo;
    selectedPlayers: PlayerInfo[];
}


export interface DisplayableItemInfo {
  name: string;
  picture?: string;
}
