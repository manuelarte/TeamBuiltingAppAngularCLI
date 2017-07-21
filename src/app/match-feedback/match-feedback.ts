export class MatchFeedback {
    id: string;
    matchId: string;
    userId: string;
    ratings: {[playerInfo: string]: number};
    rewards: {[playerInfo: string]: string}

}
