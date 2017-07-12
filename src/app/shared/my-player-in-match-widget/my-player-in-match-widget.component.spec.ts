import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPlayerInMatchWidgetComponent } from './my-player-in-match-widget.component';

describe('MyPlayerInMatchWidgetComponent', () => {
  let component: MyPlayerInMatchWidgetComponent;
  let fixture: ComponentFixture<MyPlayerInMatchWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPlayerInMatchWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPlayerInMatchWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
