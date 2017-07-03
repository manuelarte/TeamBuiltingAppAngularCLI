import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStringWidgetComponent } from './my-string-widget.component';

describe('MyStringWidgetComponent', () => {
  let component: MyStringWidgetComponent;
  let fixture: ComponentFixture<MyStringWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStringWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStringWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
