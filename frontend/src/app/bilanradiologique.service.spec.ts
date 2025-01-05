import { TestBed } from '@angular/core/testing';

import { BilanradiologiqueService } from './bilanradiologique.service';

describe('BilanradiologiqueService', () => {
  let service: BilanradiologiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BilanradiologiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
