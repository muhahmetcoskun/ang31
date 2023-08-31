import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimTurleriTanimlaComponent } from './prim-turleri-tanimla.component';

describe('PrimTurleriTanimlaComponent', () => {
  let component: PrimTurleriTanimlaComponent;
  let fixture: ComponentFixture<PrimTurleriTanimlaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimTurleriTanimlaComponent]
    });
    fixture = TestBed.createComponent(PrimTurleriTanimlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
