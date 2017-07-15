import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchTeamInfoComponent } from './match-team-info.component';

describe('MatchTeamInfoComponent', () => {
  let component: MatchTeamInfoComponent;
  let fixture: ComponentFixture<MatchTeamInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchTeamInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchTeamInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
