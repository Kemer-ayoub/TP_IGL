
import { Component,CUSTOM_ELEMENTS_SCHEMA,EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Location } from '@angular/common';
import { MedecinAddNewPrescriptionComponent } from '../medecin-add-new-prescription/medecin-add-new-prescription.component';
import { ConsultationService } from '../consultation.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-medecin-add-new-consultation',
  templateUrl: './medecin-add-new-consultation.component.html',
  styleUrls: ['./medecin-add-new-consultation.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class MedecinAddNewConsultationComponent {
  consultation = {
    date: '',
    doctorName: '',
    reason: '',
    summary: '',
    prescriptions: [],
  };
  date: string = '';
  doctor: string = '';
  patient: string = '';
  reason: string = '';
  summary: string = '';
  data: any = null;
  thedoctor: any;
  thepatient: any;
  consultationId: any;
  consultationService = inject(ConsultationService);
  authService = inject(AuthService);
  
  


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

  addConsultation() {
    console.log('addConsultation');
    if (!this.date || !this.doctor || !this.patient || !this.reason || !this.summary) {
      return; // If any field is empty, don't proceed
    }
    console.log('egoist');
    this.authService.getUserByUsername(this.doctor).subscribe({
      next: (response: any) => {
        this.thedoctor = response
        this.authService.getUserByUsername(this.patient).subscribe({
          next: (response: any) => {
            this.thepatient = response
            this.data = {
              "medecin": this.thedoctor.id,
              "date_cons": this.date,
              "diagnostic": this.reason,
              "resume": this.summary,
              "dpi": this.thepatient.id,
            }
        
            console.log("that's where i follow", this.data)
            // Handle the form submission here
            this.consultationService.addConsultation(this.data).subscribe({
              next: (response) => {
                console.log("If the world is ending i wanna get back to you",response)
                this.consultationId = response.id
              },
              error: (error) => console.error('Error fetching DPI:', error)
            })
          }
        })

      }
    })
    /*this.data = {
      "medecin": this.doctor,
      "date_cons": this.data,
      "diagnostic": this.reason,
      "resume": this.summary,
      "dpi": this.patient,
    }

      console.log("that's where i follow", this.data)
      // Handle the form submission here
      this.consultationService.addConsultation(this.data).subscribe({
        next: (response) => {
          console.log("the badi",response)
          this.consultationId = response.id
        },
        error: (error) => console.error('Error fetching DPI:', error)
      })*/
  }

  // Fonction qui gère l'affichage de la prescription
  togglePrescriptionVisibility() {
    console.log('togglePrescriptionVisibility');
    this.showAddPrescription = !this.showAddPrescription;
    
  }

  // Cancel the operation
  cancel() {
    this.router.navigate(['/dashboard']); // Navigate to the desired route
  }
}
