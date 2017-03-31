import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDetailIntroComponent } from './player-detail-intro.component';

describe('PlayerDetailIntroComponent', () => {
  let component: PlayerDetailIntroComponent;
  let fixture: ComponentFixture<PlayerDetailIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerDetailIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDetailIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
