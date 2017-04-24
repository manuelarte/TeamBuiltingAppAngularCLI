import {NgModule, LOCALE_ID} from '@angular/core';
import { CommonModule } from '@angular/common'
import {ClarityModule} from 'clarity-angular';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AgmCoreModule} from 'angular2-google-maps/core';

import {InputTextModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';


import {GrowlModule} from 'primeng/primeng';
import {DataListModule} from 'primeng/primeng';

import {CalendarModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';
import {
    MdButtonModule, MdCheckboxModule, MdIconModule, MdInputModule, MdProgressSpinnerModule,
    MdSelectModule
} from '@angular/material';
import {SportModule} from '../sport/sport.module';
import {PlayerCudComponent} from '../player/player-cud/player-cud.component';
import {TeamCudComponent} from './team-cud/team-cud.component';


@NgModule({
    imports: [
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAnvqOUmUsKviVfAP6TDv6eTj6nAzaCmw4'
        }),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ClarityModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAnvqOUmUsKviVfAP6TDv6eTj6nAzaCmw4'
        }),
        MdButtonModule,
        // PrimeNG modules
        CalendarModule,
        DataListModule,
        DropdownModule,
        GrowlModule,
        InputTextModule,
        MultiSelectModule,
        // Material Modules,
        MdInputModule,
        MdSelectModule,
        MdCheckboxModule,
        MdIconModule,
        MdProgressSpinnerModule,
        // Other modules
        SportModule,
    ],
    declarations: [
        PlayerCudComponent,
        TeamCudComponent,
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'nl'},
    ],
    exports: [PlayerCudComponent, TeamCudComponent]
})
export class ProfileModule {
}
