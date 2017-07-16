import {JsonSchema} from '../json-schema';
export interface MatchEvent {
    [key: string]: any | {
        id: string;
        when: Date;
        description: string;
    }
}


export class GoalMatchEvent implements MatchEvent {
    goal: {
      id: string;
      when: Date;
      who: string;
      teamThatScored: string;
      description: string;
    }
}

/*
export class SubstitutionMatchEvent implements MatchEvent {
    id: string;
    when: Date;
    in: string;
    out: string;
    description: string;
}
*/

export class MatchEventSchemaAndWidget {
    [eventType: string]: {
        schema: JsonSchema;
        widget: {
            [property: string]: {
                id: string,
                widgetProperties: Object;
            }
        };
    }
}
