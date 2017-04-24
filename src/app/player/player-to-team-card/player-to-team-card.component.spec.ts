import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerToTeamCardComponent } from './player-to-team-card.component';

describe('PlayerToTeamCardComponent', () => {
  let component: PlayerToTeamCardComponent;
  let fixture: ComponentFixture<PlayerToTeamCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerToTeamCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerToTeamCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
