/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ClarityModule } from "clarity-angular";
import { APP_BASE_HREF } from "@angular/common";
import {AppRoutingModule} from "./app-routing.module";
import {ProfileModule} from "./profile/profile.module";
import {StatisticsComponent} from "./statistics/statistics.component";
import {DonateComponent} from "./donate/donate.component";
import {GoogleChartComponentComponent} from "./google-chart-component/google-chart-component.component";
import {GoogleChart} from "app/directives/angular2-google-chart.directive";

describe('AppComponent', () => {

    let fixture: ComponentFixture<any>;
    let compiled: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                AboutComponent,
                HomeComponent,
                StatisticsComponent,
                DonateComponent,
                GoogleChartComponentComponent,
                GoogleChart,
            ],
            imports: [
                AppRoutingModule,
                ClarityModule.forRoot(),
                ProfileModule,
            ],
            providers: [{provide: APP_BASE_HREF, useValue: '/'}]
        });

        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        compiled = fixture.nativeElement;


    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create the app', async(() => {
        expect(compiled).toBeTruthy();
    }));


});
