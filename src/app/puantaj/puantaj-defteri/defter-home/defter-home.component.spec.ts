import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefterHomeComponent } from './defter-home.component';

describe('DefterHomeComponent', () => {
  let component: DefterHomeComponent;
  let fixture: ComponentFixture<DefterHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefterHomeComponent]
    });
    fixture = TestBed.createComponent(DefterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
