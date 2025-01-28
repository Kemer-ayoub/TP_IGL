import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-exams-list-patient',
  imports: [CommonModule],
  templateUrl: './exams-list-patient.component.html',
  styleUrl: './exams-list-patient.component.css'
})
export class ExamsListPatientComponent {
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
