import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchEventsShowComponent } from './match-events-show.component';

describe('MatchEventsShowComponent', () => {
  let component: MatchEventsShowComponent;
  let fixture: ComponentFixture<MatchEventsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchEventsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchEventsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
