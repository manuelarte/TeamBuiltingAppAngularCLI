export class PlayerComment {
    id: string;
    userId: string;
    playerId: number;
    reason: string;
    comment: string;
    when: Date;
}

export class IncomingPlayerComment {
    id: string;
    playerId: number;
    reason: string;
    comment: string;
}
