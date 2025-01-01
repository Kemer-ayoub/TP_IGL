import { Component,Input, Output, EventEmitter } from '@angular/core';
import { PatientComponent } from '../patient/patient.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prescription-detail-pharmacien',
  imports: [PatientComponent,CommonModule,FormsModule],
  templateUrl: './prescription-detail-pharmacien.component.html',
  styleUrl: './prescription-detail-pharmacien.component.css'
})
export class PrescriptionDetailPharmacienComponent {

  @Input() patient: any = null;  // Reçoit les informations du patient
  @Input() selectedPrescription: any = null;  // Reçoit la prescription sélectionnée
  @Output() backToConsultationList = new EventEmitter<void>();
  @Output() backToPrescriptionList = new EventEmitter<void>();
  
  calculateAge(dob: string): number {
    const [day, month, year] = dob.split('/').map(num => parseInt(num, 10));
    const birthDate = new Date(year, month - 1, day);  
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }
  onBackToConsultationList() {
    this.backToConsultationList.emit();  // Émet l'événement lorsque l'utilisateur clique sur "Retour à la consultation"
  }
  onBackToPrescriptionList() {
    this.backToPrescriptionList.emit();  // Émet l'événement pour retourner à la liste des prescriptions
  }
}
