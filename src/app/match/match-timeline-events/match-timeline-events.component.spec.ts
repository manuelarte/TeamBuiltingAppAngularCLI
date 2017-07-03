import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchTimelineEventsComponent } from './match-timeline-events.component';

describe('MatchTimelineEventsComponent', () => {
  let component: MatchTimelineEventsComponent;
  let fixture: ComponentFixture<MatchTimelineEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchTimelineEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchTimelineEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
