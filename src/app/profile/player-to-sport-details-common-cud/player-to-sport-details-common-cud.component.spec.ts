import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerToSportDetailsCommonCudComponent } from './player-to-sport-details-common-cud.component';

describe('PlayerToSportDetailsCommonCudComponent', () => {
  let component: PlayerToSportDetailsCommonCudComponent;
  let fixture: ComponentFixture<PlayerToSportDetailsCommonCudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerToSportDetailsCommonCudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerToSportDetailsCommonCudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
