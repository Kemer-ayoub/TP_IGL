import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsPatientComponent } from './buttons-patient.component';

describe('ButtonsPatientComponent', () => {
  let component: ButtonsPatientComponent;
  let fixture: ComponentFixture<ButtonsPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsPatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
