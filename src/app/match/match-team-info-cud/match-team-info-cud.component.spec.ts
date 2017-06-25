import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchTeamInfoCudComponent } from './match-team-info-cud.component';

describe('MatchCudComponent', () => {
  let component: MatchTeamInfoCudComponent;
  let fixture: ComponentFixture<MatchTeamInfoCudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchTeamInfoCudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchTeamInfoCudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
