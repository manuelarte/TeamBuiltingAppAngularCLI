import {DefaultWidgetRegistry} from 'angular2-schema-form';
import {MyStringWidgetComponent} from './my-string-widget/my-string-widget.component';
import {MyTimeInMatchWidgetComponent} from './my-time-in-match-widget/my-time-in-match-widget.component';
import {MyPlayerInMatchWidgetComponent} from './my-player-in-match-widget/my-player-in-match-widget.component';
import {MyTeamInMatchWidgetComponent} from './my-team-in-match-widget/my-team-in-match-widget.component';

export class MyWidgetRegistry extends DefaultWidgetRegistry {
    constructor() {
        super();

        this.register('string',  MyStringWidgetComponent);

        // custom widgets match specialized
        this.register('when',  MyTimeInMatchWidgetComponent);
        this.register('player',  MyPlayerInMatchWidgetComponent);
        this.register('team',  MyTeamInMatchWidgetComponent);
    }
}
