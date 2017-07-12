import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTimeInMatchWidgetComponent } from './my-time-in-match-widget.component';

describe('MyTimeInMatchWidgetComponent', () => {
  let component: MyTimeInMatchWidgetComponent;
  let fixture: ComponentFixture<MyTimeInMatchWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTimeInMatchWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTimeInMatchWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
