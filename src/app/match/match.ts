import {TeamInMatch} from './team-in-match';
import {MatchPart} from './match-part';
import {MatchEvent} from './match-events';

export class Match {
    id: string;
    homeTeam: TeamInMatch;
    awayTeam: TeamInMatch;
    location: string;
    matchParts: MatchPart[];
    events: MatchEvent[];
    tags: string[];
}
