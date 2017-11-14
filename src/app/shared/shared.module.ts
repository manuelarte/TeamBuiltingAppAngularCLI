import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
import {MyTimeInMatchWidgetComponent} from './my-time-in-match-widget/my-time-in-match-widget.component';
import {MyPlayerInMatchWidgetComponent} from './my-player-in-match-widget/my-player-in-match-widget.component';
import {MyTeamInMatchWidgetComponent} from './my-team-in-match-widget/my-team-in-match-widget.component';
import {TeamPlayerSelectComponent} from './team-player-select/team-player-select.component';
import {TeamService} from '../services/team.service';
import {PlayerService} from '../services/player.service';

@NgModule({
    imports: [
        FlexLayoutModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
        MyPlayerInMatchWidgetComponent,
        MyTeamInMatchWidgetComponent,
        MyTimeInMatchWidgetComponent,
        TeamPlayerSelectComponent,
    ],
    providers: [
        TeamService,
        PlayerService,
        {provide: LOCALE_ID, useValue: 'en'},
    ],
    entryComponents: [MyStringWidgetComponent, MyPlayerInMatchWidgetComponent, MyTeamInMatchWidgetComponent, MyTimeInMatchWidgetComponent],
    exports: [GoogleChartDirective, Ng2GoogleChartsModule, MyStringWidgetComponent, MyPlayerInMatchWidgetComponent,
        MyTeamInMatchWidgetComponent, MyTimeInMatchWidgetComponent, TeamPlayerSelectComponent]
})
export class TeambuiltingSharedModule {
}
