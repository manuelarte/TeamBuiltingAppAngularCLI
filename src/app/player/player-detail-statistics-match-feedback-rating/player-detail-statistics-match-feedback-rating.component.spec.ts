import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDetailStatisticsMatchFeedbackRatingComponent } from './player-detail-statistics-match-feedback-rating.component';

describe('PlayerDetailStatisticsMatchFeedbackRatingComponent', () => {
  let component: PlayerDetailStatisticsMatchFeedbackRatingComponent;
  let fixture: ComponentFixture<PlayerDetailStatisticsMatchFeedbackRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerDetailStatisticsMatchFeedbackRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDetailStatisticsMatchFeedbackRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
