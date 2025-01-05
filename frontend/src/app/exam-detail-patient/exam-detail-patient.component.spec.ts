import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDetailPatientComponent } from './exam-detail-patient.component';

describe('ExamDetailPatientComponent', () => {
  let component: ExamDetailPatientComponent;
  let fixture: ComponentFixture<ExamDetailPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamDetailPatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamDetailPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
