import {DisplayableItemInfo, ItemInfo} from './team-in-match';

export interface PlayerInfo extends ItemInfo {
    id: string;
}

export class RegisteredPlayerInfo implements PlayerInfo {
    id: string;
    playerId: number;
}

export class UnRegisteredPlayerInfo implements PlayerInfo {
    id: string;
    name: string;
    picture: string;
}


export class DisplayablePlayerInfo implements DisplayableItemInfo {
  name: string;
  nickname?: string;
  picture?: string;
}
