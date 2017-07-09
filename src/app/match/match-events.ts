export interface MatchEvent {
    [key: string]: any | {
        when: Date;
        description: string;
    }
}

/*
export class GoalMatchEvent implements MatchEvent {
    id: string;
    when: Date;
    who: string;
    teamThatScored: string;
    description: string;
}

export class SubstitutionMatchEvent implements MatchEvent {
    id: string;
    when: Date;
    in: string;
    out: string;
    description: string;
}
*/
