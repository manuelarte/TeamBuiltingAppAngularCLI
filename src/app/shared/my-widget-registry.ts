import {DefaultWidgetRegistry} from 'angular2-schema-form';
import {MyStringWidgetComponent} from './my-string-widget/my-string-widget.component';
import {MyTimeInMatchWidgetComponent} from './my-time-in-match-widget/my-time-in-match-widget.component';

export class MyWidgetRegistry extends DefaultWidgetRegistry {
    constructor() {
        super();

        this.register('string',  MyStringWidgetComponent);
        this.register('when',  MyTimeInMatchWidgetComponent);
    }
}
