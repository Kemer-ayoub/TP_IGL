import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPatientInfirmierComponent } from './button-patient-infirmier.component';

describe('ButtonPatientInfirmierComponent', () => {
  let component: ButtonPatientInfirmierComponent;
  let fixture: ComponentFixture<ButtonPatientInfirmierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonPatientInfirmierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonPatientInfirmierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
