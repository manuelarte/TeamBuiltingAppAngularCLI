import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerToSportDetailsModalComponent } from './player-to-sport-details-modal.component';

describe('PlayerToSportDetailsModalComponent', () => {
  let component: PlayerToSportDetailsModalComponent;
  let fixture: ComponentFixture<PlayerToSportDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerToSportDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerToSportDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
