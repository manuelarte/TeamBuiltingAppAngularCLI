import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchFeedbackRewardsDisplayComponent } from './match-feedback-rewards-display.component';

describe('MatchFeedbackRewardsDisplayComponent', () => {
  let component: MatchFeedbackRewardsDisplayComponent;
  let fixture: ComponentFixture<MatchFeedbackRewardsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchFeedbackRewardsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchFeedbackRewardsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
