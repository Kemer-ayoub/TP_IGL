import { TestBed } from '@angular/core/testing';

import { BilanbiologiqueService } from './bilanbiologique.service';

describe('BilanbiologiqueService', () => {
  let service: BilanbiologiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BilanbiologiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
