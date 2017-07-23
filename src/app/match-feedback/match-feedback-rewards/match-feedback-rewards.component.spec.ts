import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchFeedbackRewardsComponent } from './match-feedback-rewards.component';

describe('MatchFeedbackRewardsComponent', () => {
  let component: MatchFeedbackRewardsComponent;
  let fixture: ComponentFixture<MatchFeedbackRewardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchFeedbackRewardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchFeedbackRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
