import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPlayerRatingComponent } from './match-player-rating.component';

describe('MatchPlayerRatingComponent', () => {
  let component: MatchPlayerRatingComponent;
  let fixture: ComponentFixture<MatchPlayerRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPlayerRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPlayerRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
