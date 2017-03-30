import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorEntityNotFoundComponent } from './error-entity-not-found.component';

describe('ErrorEntityNotFoundComponent', () => {
  let component: ErrorEntityNotFoundComponent;
  let fixture: ComponentFixture<ErrorEntityNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorEntityNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorEntityNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
