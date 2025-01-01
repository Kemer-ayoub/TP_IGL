import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medecin-add-new-consultation',
  templateUrl: './medecin-add-new-consultation.component.html',
  styleUrls: ['./medecin-add-new-consultation.component.css'],
})
export class MedecinAddNewConsultationComponent {
  // Form fields
  date_cons: string = '';
  medecin_id: number = 0; // Replace with actual medecin ID
  dpi_id: number = 0; // Replace with actual DPI ID
  diagnostic: string = '';
  resume: string = '';

  consultationId: number = 0; // Stores the created consultation's ID
  showAddPrescription: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  // Toggle the prescription section
  togglePrescriptionVisibility() {
    this.showAddPrescription = !this.showAddPrescription;
  }

  // Submit the new consultation
  submitConsultation() {
    if (!this.date_cons || !this.medecin_id || !this.dpi_id || !this.resume) {
      alert('Please fill in all required fields.');
      return;
    }

    const consultationData = {
      date_cons: this.date_cons,
      medecin_id: this.medecin_id,
      dpi_id: this.dpi_id,
      diagnostic: this.diagnostic,
      resume: this.resume,
    };

    this.http.post('/api/add-consultation/', consultationData).subscribe(
      (response: any) => {
        this.consultationId = response.id; // Save the consultation ID
        alert('Consultation added successfully!');
      },
      (error) => {
        console.error('Error adding consultation:', error);
        alert('Failed to add consultation. Please try again.');
      },
    );
  }

  // Submit or update the resume for an existing consultation
  submitResume() {
    if (!this.resume || !this.consultationId) {
      alert('Resume and consultation ID are required.');
      return;
    }

    const resumeData = { resume: this.resume };

    this.http
      .post(`/api/add-consultation-resume/${this.consultationId}/`, resumeData)
      .subscribe(
        (response: any) => {
          alert('Resume updated successfully!');
        },
        (error) => {
          console.error('Error updating resume:', error);
          alert('Failed to update resume. Please try again.');
        },
      );
  }

  // Cancel the operation
  cancel() {
    this.router.navigate(['/dashboard']); // Navigate to the desired route
  }
}
