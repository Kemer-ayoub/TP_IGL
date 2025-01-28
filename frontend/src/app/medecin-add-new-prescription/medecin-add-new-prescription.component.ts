import { Component,EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importez FormsModule
import { AuthService } from '../auth.service';
import { OrdonnanceService } from '../ordonnance.service';

@Component({
  selector: 'app-medecin-add-new-prescription',
  standalone: true,  // Si votre composant est autonome
  imports: [CommonModule, FormsModule],  // Ajoutez FormsModule ici
  templateUrl: './medecin-add-new-prescription.component.html',
  styleUrls: ['./medecin-add-new-prescription.component.css'],
})
export class MedecinAddNewPrescriptionComponent {
  //@Input() consultationId: any
  @Input() consultationId!: number; // Replace with the correct type (e.g., string or number)

  @Output() togglePrescriptionVisibility = new EventEmitter<void>();
  
  patientName: string = '';
  patientAge: string = '';
  doctorName: string = '';

  data: any = null;
  thedoctor: any;
  thepatient: any;

  ordonnanceService = inject(OrdonnanceService);
  authService = inject(AuthService);

  medications: { nom: string; dosage: string; duree: string }[] = [];
  nom: string = '';
  dosage: string = '';
  duree: string = '';

  addMedication() {
    if (this.nom && this.dosage && this.duree) {
      this.medications.push({
        nom: this.nom,
        dosage: this.dosage,
        duree: this.duree,
      });
      this.nom = '';
      this.dosage = '';
      this.duree = '';
    }
  }

  addOrdonnance() {
    console.log('addOrdonnance');
    if (!this.patientName || !this.patientAge || !this.doctorName || !this.medications.length) {
      return; // If any field is empty, don't proceed
    }
    console.log('egoist');
        this.data = {
          "valid": false,
          "consultation": this.consultationId,
          "patient_name": this.patientName,
          "patient_age": this.patientAge,
          "medecin": this.doctorName,
          "medicaments": this.medications
        }
    
        // Handle the form submission here
        this.ordonnanceService.addOrdonnance(this.data).subscribe({
          next: (response) => {
            console.log("the badi",response)
          },
          error: (error) => console.error('Error fetching DPI:', error)
        })
      }
    

  deleteMedication(index: number) {
    this.medications.splice(index, 1);
  }

  goBack() {
    this.togglePrescriptionVisibility.emit();
  }
}
