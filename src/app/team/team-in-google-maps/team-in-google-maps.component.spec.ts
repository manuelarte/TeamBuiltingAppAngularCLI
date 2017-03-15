import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInGoogleMapsComponent } from './team-in-google-maps.component';

describe('TeamInGoogleMapsComponent', () => {
  let component: TeamInGoogleMapsComponent;
  let fixture: ComponentFixture<TeamInGoogleMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamInGoogleMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamInGoogleMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
