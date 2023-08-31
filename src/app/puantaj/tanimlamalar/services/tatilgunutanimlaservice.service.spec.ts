import { TestBed } from '@angular/core/testing';

import { TatilgunutanimlaserviceService } from './tatilgunutanimlaservice.service';

describe('TatilgunutanimlaserviceService', () => {
  let service: TatilgunutanimlaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TatilgunutanimlaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
