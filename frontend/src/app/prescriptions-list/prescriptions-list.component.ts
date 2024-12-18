import { Component,Input, Output, EventEmitter } from '@angular/core';
import { PatientComponent } from '../patient/patient.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-prescriptions-list',
  imports: [PatientComponent,CommonModule,FormsModule],
  templateUrl: './prescriptions-list.component.html',
  styleUrl: './prescriptions-list.component.css'
})
export class PrescriptionsListComponent {
  @Input() prescriptions: any[] = [];  // Prescriptions to display
  @Output() prescriptionSelected = new EventEmitter<any>();  // Event emitter for selected prescription

  // Emit the selected prescription to the parent
  onSelectPrescription(prescription: any) {
    this.prescriptionSelected.emit(prescription);
  }

  onBackToPatientInfo() {
    this.prescriptionSelected.emit(null);  // Emet l'événement pour revenir à l'info du patient
  }
}
