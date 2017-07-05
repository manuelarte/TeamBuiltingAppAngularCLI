import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPartsComponent } from './match-parts.component';

describe('MatchPartsComponent', () => {
  let component: MatchPartsComponent;
  let fixture: ComponentFixture<MatchPartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
