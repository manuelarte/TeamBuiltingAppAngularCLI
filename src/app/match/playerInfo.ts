export interface PlayerInfo {
    id: string;
}

export class RegisteredPlayerInfo implements PlayerInfo {
    id: string;
    playerId: string;
}

export class UnRegisteredPlayerInfo implements PlayerInfo {
    id: string;
    name: string;
}
