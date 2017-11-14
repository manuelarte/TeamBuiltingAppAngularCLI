/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { APP_BASE_HREF } from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {ProfileModule} from './profile/profile.module';
import {StatisticsComponent} from './statistics/statistics.component';
import {DonateComponent} from './donate/donate.component';

describe('AppComponent', () => {

    let fixture: ComponentFixture<any>;
    let compiled: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                HomeComponent,
                StatisticsComponent,
                DonateComponent,
            ],
            imports: [
                AppRoutingModule,
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
