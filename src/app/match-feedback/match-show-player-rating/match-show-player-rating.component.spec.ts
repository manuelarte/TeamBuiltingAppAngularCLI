import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchShowPlayerRatingComponent } from './match-show-player-rating.component';

describe('MatchPlayerRatingComponent', () => {
  let component: MatchShowPlayerRatingComponent;
  let fixture: ComponentFixture<MatchShowPlayerRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchShowPlayerRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchShowPlayerRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
