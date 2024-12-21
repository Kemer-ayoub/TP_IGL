import { TestBed } from '@angular/core/testing';

import { MockInfirmierService } from './mock-infirmier.service';

describe('MockInfirmierService', () => {
  let service: MockInfirmierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockInfirmierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
