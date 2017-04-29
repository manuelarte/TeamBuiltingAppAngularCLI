import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCudCardComponent } from './player-cud-card.component';

describe('PlayerCudCardComponent', () => {
  let component: PlayerCudCardComponent;
  let fixture: ComponentFixture<PlayerCudCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerCudCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCudCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
