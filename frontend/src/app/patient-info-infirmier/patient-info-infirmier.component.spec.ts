import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInfoInfirmierComponent } from './patient-info-infirmier.component';

describe('PatientInfoInfirmierComponent', () => {
  let component: PatientInfoInfirmierComponent;
  let fixture: ComponentFixture<PatientInfoInfirmierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientInfoInfirmierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientInfoInfirmierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
