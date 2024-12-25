import { Component,Input, Output, EventEmitter } from '@angular/core';
import { PatientComponent } from '../patient/patient.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-medical-history',
  imports: [PatientComponent,CommonModule,FormsModule],
  templateUrl: './medical-history.component.html',
  styleUrl: './medical-history.component.css'
})
export class MedicalHistoryComponent {
  @Input() patient: any;
  @Input() showMedicalHistory: boolean = false;

  // EventEmitters for navigation actions
  @Output() backToPatientInfoMedicalHistory: EventEmitter<void> = new EventEmitter();

  // Method to handle the "back" button click
  onBackToPatientInfoMedicalHistory() {
    this.backToPatientInfoMedicalHistory.emit();
  }

}
