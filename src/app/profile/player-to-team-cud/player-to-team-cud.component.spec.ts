import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerToTeamCudComponent } from './player-to-team-cud.component';

describe('PlayerToTeamCudComponent', () => {
  let component: PlayerToTeamCudComponent;
  let fixture: ComponentFixture<PlayerToTeamCudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerToTeamCudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerToTeamCudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
