import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerToTeamWizardComponent } from './player-to-team-wizard.component';

describe('PlayerToTeamWizardComponent', () => {
  let component: PlayerToTeamWizardComponent;
  let fixture: ComponentFixture<PlayerToTeamWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerToTeamWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerToTeamWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
