import { TestBed } from '@angular/core/testing';

import { DpiService } from './dpi.service';

describe('DpiService', () => {
  let service: DpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
