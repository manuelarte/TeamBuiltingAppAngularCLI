export interface TeamInfo {
    id: string;
}

export class RegisteredTeamInfo implements TeamInfo {
    id: string;
    teamId: string;
}

export class UnRegisteredTeamInfo implements TeamInfo {
    id: string;
    name: string;
}
