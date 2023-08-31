import { TestBed } from '@angular/core/testing';

import { BasetanimlamalarserviceService } from './basetanimlamalarservice.service';

describe('BasetanimlamalarserviceService', () => {
  let service: BasetanimlamalarserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasetanimlamalarserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
