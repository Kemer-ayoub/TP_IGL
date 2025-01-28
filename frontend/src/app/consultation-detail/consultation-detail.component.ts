import { Component, Input, Output, OnChanges, SimpleChanges ,EventEmitter} from '@angular/core';
import { PatientComponent } from '../patient/patient.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultation-detail',
  imports: [CommonModule,FormsModule,PatientComponent],
  templateUrl: './consultation-detail.component.html',
  styleUrl: './consultation-detail.component.css'
})
export class ConsultationDetailComponent {
<<<<<<< HEAD
  @Input() selectedConsultation: any;
=======
   @Input() selectedConsultation: any;
>>>>>>> 1109aeef4c2c5a93517dd75840f96155dc960e5b
  @Input() selectedPrescription: any;

  @Output() backToConsultationList: EventEmitter<void> = new EventEmitter();
  @Output() selectPrescription: EventEmitter<any> = new EventEmitter();

  // Method to go back to the consultation list
  onBackToConsultationList() {
    this.backToConsultationList.emit();
  }

  // Method to select a prescription
  onSelectPrescription(prescription: any) {
    this.selectPrescription.emit(prescription);
  }
}
