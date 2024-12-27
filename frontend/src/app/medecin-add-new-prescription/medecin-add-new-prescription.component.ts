import { Component,EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importez FormsModule

@Component({
  selector: 'app-medecin-add-new-prescription',
  standalone: true,  // Si votre composant est autonome
  imports: [CommonModule, FormsModule],  // Ajoutez FormsModule ici
  templateUrl: './medecin-add-new-prescription.component.html',
  styleUrls: ['./medecin-add-new-prescription.component.css'],
})
export class MedecinAddNewPrescriptionComponent {
  @Output() togglePrescriptionVisibility = new EventEmitter<void>();
  

  medications: { name: string; dose: string; duration: string }[] = [];
  medicationName: string = '';
  medicationDose: string = '';
  medicationDuration: string = '';

  addMedication() {
    if (this.medicationName && this.medicationDose && this.medicationDuration) {
      this.medications.push({
        name: this.medicationName,
        dose: this.medicationDose,
        duration: this.medicationDuration,
      });
      this.medicationName = '';
      this.medicationDose = '';
      this.medicationDuration = '';
    }
  }

  deleteMedication(index: number) {
    this.medications.splice(index, 1);
  }

  goBack() {
    this.togglePrescriptionVisibility.emit();
  }
}
