import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchTagsComponent } from './match-tags.component';

describe('MatchTagsComponent', () => {
  let component: MatchTagsComponent;
  let fixture: ComponentFixture<MatchTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
