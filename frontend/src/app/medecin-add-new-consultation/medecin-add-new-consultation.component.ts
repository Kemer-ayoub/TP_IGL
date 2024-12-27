// src/app/medecin-add-new-consultation/medecin-add-new-consultation.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { MedecinAddNewPrescriptionComponent } from '../medecin-add-new-prescription/medecin-add-new-prescription.component';

@Component({
  selector: 'app-medecin-add-new-consultation',
  imports: [FormsModule, MedecinAddNewPrescriptionComponent, CommonModule],
  templateUrl: './medecin-add-new-consultation.component.html',
  styleUrls: ['./medecin-add-new-consultation.component.css']
})
export class MedecinAddNewConsultationComponent {
  consultation = {
    date: '',
    doctorName: '',
    reason: '',
    summary: '',
    prescriptions: [],
  };

  showAddPrescription: boolean = false;

  constructor(private router: Router) {}

  submitConsultation() {
    console.log('Consultation créée :', this.consultation);
    // Logique pour sauvegarder les données dans la base de données
  }

  // Fonction qui gère l'affichage de la prescription
  togglePrescriptionVisibility() {
    this.showAddPrescription = !this.showAddPrescription;
  }
}
