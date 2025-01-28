import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionDetailPharmacienComponent } from './prescription-detail-pharmacien.component';

describe('PrescriptionDetailPharmacienComponent', () => {
  let component: PrescriptionDetailPharmacienComponent;
  let fixture: ComponentFixture<PrescriptionDetailPharmacienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrescriptionDetailPharmacienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescriptionDetailPharmacienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
