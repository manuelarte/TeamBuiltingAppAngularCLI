import {JsonSchema} from '../json-schema';
export interface MatchEvent {
    [key: string]: any | {
        id: string;
        when: Date;
        description: string;
    };

}



export class GoalMatchEvent implements MatchEvent {
    goal: {
      id: string;
      when: Date;
      who: string;
      assist: string;
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

export class MatchEventSchemaAndUi {
  [eventType: string]: {
    schema: JsonSchema;
    ui: Ui;
  }
}

export class Ui {
  iconName?: string;
  teamProperty?: string;
  playerProperty?: string;
  tableProperties: string[];
  properties: {
    [key: string]: UiProperty
  };

  getUiProperyFor(propertyName: string): UiProperty {
    return this[propertyName];
  }
}

export class UiProperty {
  widget: {
    id: string,
    widgetProperties: Object;
  }
}
