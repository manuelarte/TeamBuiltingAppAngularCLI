export interface PlayerInfo {
    id: string;
}

export class RegisteredPlayerInfo implements PlayerInfo {
    id: string;
    playerId: number;
}

export class UnRegisteredPlayerInfo implements PlayerInfo {
    id: string;
    name: string;
}


export class DisplayablePlayerInfo {
  name: string;
  nickname?: string;
  picture?: string;
}
