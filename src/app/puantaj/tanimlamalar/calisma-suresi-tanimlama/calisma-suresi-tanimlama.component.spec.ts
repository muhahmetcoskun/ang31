import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalismaSuresiTanimlamaComponent } from './calisma-suresi-tanimlama.component';

describe('CalismaSuresiTanimlamaComponent', () => {
  let component: CalismaSuresiTanimlamaComponent;
  let fixture: ComponentFixture<CalismaSuresiTanimlamaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalismaSuresiTanimlamaComponent]
    });
    fixture = TestBed.createComponent(CalismaSuresiTanimlamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
