import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamInMatchWidgetComponent } from './my-team-in-match-widget.component';

describe('MyTeamInMatchWidgetComponent', () => {
  let component: MyTeamInMatchWidgetComponent;
  let fixture: ComponentFixture<MyTeamInMatchWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTeamInMatchWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamInMatchWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
