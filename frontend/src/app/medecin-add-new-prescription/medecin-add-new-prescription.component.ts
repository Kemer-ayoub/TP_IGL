import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medecin-add-new-prescription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medecin-add-new-prescription.component.html',
  styleUrls: ['./medecin-add-new-prescription.component.css'],
})
export class MedecinAddNewPrescriptionComponent {
  @Output() togglePrescriptionVisibility = new EventEmitter<void>();

  medications: { name: string; dose: string; duration: string }[] = [];
  medicationName: string = '';
  medicationDose: string = '';
  medicationDuration: string = '';
  consultationId: number = 1; // Replace with dynamic consultation ID as needed

  constructor(private http: HttpClient) {} // Inject HttpClient

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

  createPrescription() {
    const url = `/api/ordonnance/create/${this.consultationId}/`; // Adjust API endpoint
    const payload = {
      medications: this.medications.map((med) => ({
        name: med.name,
        dosage: med.dose,
        duration: med.duration,
      })),
    };

    this.http.post(url, payload).subscribe(
      (response) => {
        console.log('Prescription created successfully:', response);
        alert('Prescription created successfully!');
        this.goBack(); // Optionally go back or reset
      },
      (error) => {
        console.error('Error creating prescription:', error);
        alert('Error creating prescription. Please try again.');
      },
    );
  }
}
