import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {CommonModule} from '@angular/common';
import {
    MdButtonModule, MdCardModule, MdCheckboxModule, MdDatepickerModule, MdIconModule, MdInputModule, MdNativeDateModule,
    MdProgressSpinnerModule,
    MdSliderModule
} from '@angular/material';

import {FlexLayoutModule} from '@angular/flex-layout';
import {GoogleChartDirective} from './directives/angular2-google-chart.directive';

@NgModule({
    imports: [
        FlexLayoutModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        // Material Modules
        MdButtonModule,
        MdCardModule,
        MdCheckboxModule,
        MdDatepickerModule,
        MdNativeDateModule,
        MdIconModule,
        MdInputModule,
        MdSliderModule,
        MdProgressSpinnerModule
    ],
    declarations: [
        GoogleChartDirective,
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'nl'},
    ],
    exports: [GoogleChartDirective]
})
export class SharedModule {
}
