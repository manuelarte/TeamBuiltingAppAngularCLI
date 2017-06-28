import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPlayerInfoComponent } from './match-player-info.component';

describe('MatchPlayerInfoComponent', () => {
  let component: MatchPlayerInfoComponent;
  let fixture: ComponentFixture<MatchPlayerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPlayerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPlayerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
