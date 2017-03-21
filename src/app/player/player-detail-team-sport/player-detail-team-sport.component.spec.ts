import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDetailTeamSportComponent } from './player-detail-team-sport.component';

describe('PlayerDetailTeamSportComponent', () => {
  let component: PlayerDetailTeamSportComponent;
  let fixture: ComponentFixture<PlayerDetailTeamSportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerDetailTeamSportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDetailTeamSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
