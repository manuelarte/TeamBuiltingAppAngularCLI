import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPlayerInfoCudComponent } from './match-player-info-cud.component';

describe('MatchPlayerInfoCudComponent', () => {
  let component: MatchPlayerInfoCudComponent;
  let fixture: ComponentFixture<MatchPlayerInfoCudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPlayerInfoCudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPlayerInfoCudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
