import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerToTeamShowComponent } from './player-to-team-show.component';

describe('PlayerToTeamShowComponent', () => {
  let component: PlayerToTeamShowComponent;
  let fixture: ComponentFixture<PlayerToTeamShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerToTeamShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerToTeamShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
