import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-exams-list-patient',
  imports: [CommonModule],
  templateUrl: './exams-list-patient.component.html',
  styleUrl: './exams-list-patient.component.css'
})
export class ExamsListPatientComponent implements OnChanges {
  @Input() cares: any[] = [];  // Array of consultations passed from parent
  @Input() selectedCare: any;   // Current selected consultation
  @Output() consultationSelected = new EventEmitter<any>();  // Emit when consultation is selected
  @Output() backToPatientInfo = new EventEmitter<void>(); 

  constructor() {
    console.log("i tryna put you",this.cares)
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['cares']) {
      console.log("Updated cares:", this.cares);
    }
  }
  trackByFn(index: number, care: any) {
    return care.id; // Use a unique identifier
  }
  selectConsultation(consultation: any) {
    this.consultationSelected.emit(consultation);  // Emit selected consultation to parent
  }

  backToPatientInfoConsultation() {
    this.backToPatientInfo.emit();  // Emit event to notify parent to go back
  }
}
