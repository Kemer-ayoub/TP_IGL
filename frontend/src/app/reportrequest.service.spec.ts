import { TestBed } from '@angular/core/testing';

import { ReportrequestService } from './reportrequest.service';

describe('ReportrequestService', () => {
  let service: ReportrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
