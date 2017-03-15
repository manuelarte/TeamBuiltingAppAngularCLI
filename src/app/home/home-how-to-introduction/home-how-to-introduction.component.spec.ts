import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHowToIntroductionComponent } from './home-how-to-introduction.component';

describe('HomeHowToIntroductionComponent', () => {
  let component: HomeHowToIntroductionComponent;
  let fixture: ComponentFixture<HomeHowToIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeHowToIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHowToIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
