import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPlayerSelectComponent } from './team-player-select.component';

describe('TeamPlayerSelectComponent', () => {
  let component: TeamPlayerSelectComponent;
  let fixture: ComponentFixture<TeamPlayerSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPlayerSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPlayerSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
