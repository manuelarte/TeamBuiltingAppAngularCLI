import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchFeedbackItemInfoRatingComponent } from './match-feedback-item-info-rating.component';

describe('MatchFeedbackItemInfoRatingComponent', () => {
  let component: MatchFeedbackItemInfoRatingComponent;
  let fixture: ComponentFixture<MatchFeedbackItemInfoRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchFeedbackItemInfoRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchFeedbackItemInfoRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
