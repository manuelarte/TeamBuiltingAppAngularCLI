import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPlayersInfoComponent } from './match-players-info.component';

describe('MatchPlayersInfoComponent', () => {
  let component: MatchPlayersInfoComponent;
  let fixture: ComponentFixture<MatchPlayersInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPlayersInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPlayersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
