import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHowToLoginComponent } from './home-how-to-login.component';

describe('HomeHowToLoginComponent', () => {
  let component: HomeHowToLoginComponent;
  let fixture: ComponentFixture<HomeHowToLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeHowToLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHowToLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
