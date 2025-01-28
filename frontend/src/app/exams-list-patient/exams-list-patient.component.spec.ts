import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsListPatientComponent } from './exams-list-patient.component';

describe('ExamsListPatientComponent', () => {
  let component: ExamsListPatientComponent;
  let fixture: ComponentFixture<ExamsListPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamsListPatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamsListPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
