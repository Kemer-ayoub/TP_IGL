import { TestBed } from '@angular/core/testing';

import { ExamrequestService } from './examrequest.service';

describe('ReportrequestService', () => {
  let service: ExamrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
