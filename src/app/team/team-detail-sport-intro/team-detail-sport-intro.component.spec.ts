import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailSportIntroComponent } from './team-detail-sport-intro.component';

describe('TeamDetailSportIntroComponent', () => {
  let component: TeamDetailSportIntroComponent;
  let fixture: ComponentFixture<TeamDetailSportIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDetailSportIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailSportIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
