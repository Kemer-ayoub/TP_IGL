import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common'; 
import { MedecinAddNewConsultationComponent } from './medecin-add-new-consultation.component';


describe('MedecinAddNewConsultationComponent', () => {
  let component: MedecinAddNewConsultationComponent;
  let fixture: ComponentFixture<MedecinAddNewConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedecinAddNewConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedecinAddNewConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
