export interface MatchEvent {
    id: string;
    when: Date;
}

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
