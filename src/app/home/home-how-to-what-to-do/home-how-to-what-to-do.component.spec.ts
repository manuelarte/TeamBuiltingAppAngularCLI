import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHowToWhatToDoComponent } from './home-how-to-what-to-do.component';

describe('HomeHowToWhatToDoComponent', () => {
  let component: HomeHowToWhatToDoComponent;
  let fixture: ComponentFixture<HomeHowToWhatToDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeHowToWhatToDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHowToWhatToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
