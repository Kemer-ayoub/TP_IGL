import { TestBed } from '@angular/core/testing';

import { SoinService } from './soin.service';

describe('SoinService', () => {
  let service: SoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
