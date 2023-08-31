import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TatilGunuTanimlaHomeComponent } from './tatil-gunu-tanimla-home.component';

describe('TatilGunuTanimlaHomeComponent', () => {
  let component: TatilGunuTanimlaHomeComponent;
  let fixture: ComponentFixture<TatilGunuTanimlaHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TatilGunuTanimlaHomeComponent]
    });
    fixture = TestBed.createComponent(TatilGunuTanimlaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
