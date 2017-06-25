import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCudComponent } from './match-cud.component';

describe('MatchCudComponent', () => {
  let component: MatchCudComponent;
  let fixture: ComponentFixture<MatchCudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchCudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchCudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
