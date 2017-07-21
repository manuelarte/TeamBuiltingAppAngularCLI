import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchFeedbackFormComponent } from './match-feedback-form.component';

describe('MatchFeedbackFormComponent', () => {
  let component: MatchFeedbackFormComponent;
  let fixture: ComponentFixture<MatchFeedbackFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchFeedbackFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchFeedbackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
