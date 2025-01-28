import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-exams-list-labo',
  imports: [CommonModule],
  templateUrl: './exams-list-labo.component.html',
  styleUrl: './exams-list-labo.component.css'
})
export class ExamsListLaboComponent {
<<<<<<< HEAD
  @Input() cares: any[] = [];  // Array of consultations passed from parent
=======
@Input() cares: any[] = [];  // Array of consultations passed from parent
>>>>>>> 1109aeef4c2c5a93517dd75840f96155dc960e5b
  @Input() selectedCare: any;   // Current selected consultation
  @Output() consultationSelected = new EventEmitter<any>();  // Emit when consultation is selected
  @Output() backToPatientInfo = new EventEmitter<void>(); 

  selectConsultation(consultation: any) {
    this.consultationSelected.emit(consultation);  // Emit selected consultation to parent
  }

  backToPatientInfoConsultation() {
    this.backToPatientInfo.emit();  // Emit event to notify parent to go back
  }
}
