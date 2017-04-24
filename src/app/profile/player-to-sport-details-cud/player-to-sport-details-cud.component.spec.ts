import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerToSportDetailsCudComponent } from './player-to-sport-details-cud.component';

describe('PlayerToSportDetailsCudComponent', () => {
  let component: PlayerToSportDetailsCudComponent;
  let fixture: ComponentFixture<PlayerToSportDetailsCudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerToSportDetailsCudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerToSportDetailsCudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
