export class MatchFeedback {
    id: string;
    matchId: string;
    userId: string;
    anonymous: boolean;
    ratings: {[playerInfo: string]: number};
    rewards: {[playerInfo: string]: string}
}
