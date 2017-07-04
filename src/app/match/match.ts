import {TeamInMatch} from './team-in-match';
import {MatchPart} from './match-part';

export class Match {
    id: string;
    homeTeam: TeamInMatch;
    awayTeam: TeamInMatch;
    location: string;
    matchParts: MatchPart[];

}
