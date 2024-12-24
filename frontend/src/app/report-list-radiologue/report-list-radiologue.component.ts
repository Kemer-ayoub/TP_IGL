import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-report-list-radiologue',
  imports: [CommonModule],
  templateUrl: './report-list-radiologue.component.html',
  styleUrl: './report-list-radiologue.component.css'
})
export class ReportListRadiologueComponent {
@Input() cares: any[] = [];  // Array of consultations passed from parent
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
