import { Component,Output, EventEmitter,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buttons-patient',
  imports: [ CommonModule,FormsModule],
  templateUrl: './buttons-patient.component.html',
  styleUrl: './buttons-patient.component.css'
})
export class ButtonsPatientComponent {
  @Output() toggleMedicalHistory = new EventEmitter<void>();
  @Output() viewConsultations = new EventEmitter<void>();
  @Output() viewNursingCareList = new EventEmitter<void>();
  @Output() viewExamsResults = new EventEmitter<void>();  // Ajoutez cet EventEmitter

  onToggleMedicalHistory() {
    this.toggleMedicalHistory.emit();
  }

  onViewConsultations() {
    this.viewConsultations.emit();
  }

  onViewNursingCareList() {
    this.viewNursingCareList.emit();
  }

  onViewExamsResults() {
    this.viewExamsResults.emit();  // Émet l'événement spécifique pour les résultats des examens
  }
}
