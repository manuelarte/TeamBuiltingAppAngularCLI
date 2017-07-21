export class MatchFeedback {
    id: string;
    matchId: string;
    userId: string;
    ratings: {[playerInfo: string]: number};
    rewards: {[playerInfo: string]: string}

}

/**
 * This pojo does not contain the user id since it will be retrieved by the authentication
 */
export class IncomingMatchFeedback {
    id: string;
    matchId: string;
    ratings: {[playerInfo: string]: number};
    rewards: {[playerInfo: string]: string}

}
