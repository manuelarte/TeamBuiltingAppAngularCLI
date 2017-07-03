import {DefaultWidgetRegistry} from 'angular2-schema-form';
import {MyStringWidgetComponent} from './my-string-widget/my-string-widget.component';

export class MyWidgetRegistry extends DefaultWidgetRegistry {
    constructor() {
        super();

        this.register('string',  MyStringWidgetComponent);
    }
}
