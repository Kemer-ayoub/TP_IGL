import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PatientComponent } from '../patient/patient.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultation-list',
  imports: [CommonModule,FormsModule,PatientComponent],
  templateUrl: './consultation-list.component.html',
  styleUrl: './consultation-list.component.css'
})
export class ConsultationListComponent {
  @Input() consultations: any[] = [];  // Array of consultations passed from parent
  @Input() selectedConsultation: any;   // Current selected consultation
  @Output() consultationSelected = new EventEmitter<any>();  // Emit when consultation is selected
  @Output() backToPatientInfo = new EventEmitter<void>();  // Emit when back button is clicked

  selectConsultation(consultation: any) {
    this.consultationSelected.emit(consultation);  // Emit selected consultation to parent
  }

  backToPatientInfoConsultation() {
    this.backToPatientInfo.emit();  // Emit event to notify parent to go back
  }
}
