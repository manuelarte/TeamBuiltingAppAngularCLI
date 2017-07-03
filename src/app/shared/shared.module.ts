import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {CommonModule} from '@angular/common';
import {
    MdButtonModule, MdCardModule, MdCheckboxModule, MdDatepickerModule, MdIconModule, MdInputModule, MdNativeDateModule,
    MdProgressSpinnerModule, MdSelectModule,
    MdSliderModule
} from '@angular/material';

import {FlexLayoutModule} from '@angular/flex-layout';
import {GoogleChartDirective} from './directives/angular2-google-chart.directive';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import {MyStringWidgetComponent} from "./my-string-widget/my-string-widget.component";

@NgModule({
    imports: [
        FlexLayoutModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        Ng2GoogleChartsModule,
        // Material Modules
        MdButtonModule,
        MdCardModule,
        MdCheckboxModule,
        MdDatepickerModule,
        MdNativeDateModule,
        MdIconModule,
        MdInputModule,
        MdSliderModule,
        MdSelectModule,
        MdProgressSpinnerModule,
    ],
    declarations: [
        GoogleChartDirective,
        // Widgets
        MyStringWidgetComponent,
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'nl'},
    ],
    entryComponents: [MyStringWidgetComponent],
    exports: [GoogleChartDirective, Ng2GoogleChartsModule, MyStringWidgetComponent]
})
export class SharedModule {
}
