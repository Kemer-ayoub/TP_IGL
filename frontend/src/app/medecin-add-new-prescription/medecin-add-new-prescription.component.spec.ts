import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common'; 
import { MedecinAddNewPrescriptionComponent } from './medecin-add-new-prescription.component';

describe('MedecinAddNewPrescriptionComponent', () => {
  let component: MedecinAddNewPrescriptionComponent;
  let fixture: ComponentFixture<MedecinAddNewPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedecinAddNewPrescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedecinAddNewPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
