import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { PatientInfoComponent } from '../patient-info/patient-info.component';
import { PrescriptionsListComponent } from '../prescriptions-list/prescriptions-list.component';
import { PrescriptionsDetailComponent } from '../prescriptions-detail/prescriptions-detail.component';
import { ConsultationListComponent } from '../consultation-list/consultation-list.component';
import { ConsultationDetailComponent } from '../consultation-detail/consultation-detail.component';
import { RouterLink } from '@angular/router';
import { ButtonsPatientComponent } from '../buttons-patient/buttons-patient.component';
import { NursingComponent } from '../nursing/nursing.component';
import { MedicalHistoryComponent } from '../medical-history/medical-history.component';
import { PrescriptionDetailPharmacienComponent } from '../prescription-detail-pharmacien/prescription-detail-pharmacien.component';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DpiService } from '../dpi.service';

@Component({
  selector: 'app-pharmacien',
  imports: [
    FormsModule,
    PrescriptionDetailPharmacienComponent,
    MedicalHistoryComponent,
    NursingComponent,
    ButtonsPatientComponent,
    RouterLink,
    ConsultationDetailComponent,
    CommonModule,
    ConsultationListComponent,
    HeaderComponent,
    SearchBarComponent,
    PatientInfoComponent,
    PrescriptionsDetailComponent,
    PrescriptionsListComponent,
  ],
  templateUrl: './pharmacien.component.html',
  styleUrl: './pharmacien.component.css',
})
export class PharmacienComponent {
  authService = inject(AuthService);
  dpiService = inject(DpiService);
  user?: any;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly API_URL = 'http://127.0.0.1:8000/api/';
  private readonly REFRESH_URL = `${this.API_URL}token/refresh/`;
  private DPI_URL!: string;
  private http = inject(HttpClient);
  error: string | null = null;
  dpi: any = null;
  theid: any = null;
  ordonnances: any[] = [];
  patients = [
    {
      nss: '111',
      firstName: 'Oussama',
      lastName: 'Benhebbadj',
      address: 'Algiers',
      phoneNumber: '0796201008',
      dob: '23/07/2003',
      emergencyContact: '0662890634',
      carePhysician: 'doctorX',
      consultations: [
        {
          date: '2023-04-20',
          doctorName: 'Dr. Amina',
          notes: 'Routine check-up',
          summary:
            'Routine check-up with Dr. Amina, prescriptions include Paracetamol and Ibuprofen.',
          prescriptions: [
            { name: 'Paracetamol', dose: '500mg', duration: '7 days' },
            { name: 'Ibuprofen', dose: '200mg', duration: '5 days' },
          ],
        },
      ],
      nursingCare: [
        {
          date: '2023-06-15',
          time: '10:00 AM',
          type: 'Wound Dressing',
          description: 'Dressing of a wound on the left arm.',
          observations: 'Healing well, no signs of infection.',
        },
      ],
      medicalHistory: {
        chronicIllnesses: [
          { name: 'Diabetes', date: '2018-05-01' },
          { name: 'Hypertension', date: '2020-03-10' },
        ],
        surgeries: [{ name: 'Appendectomy', date: '2015-07-20' }],
        allergies: [{ name: 'Penicillin', date: '2012-08-15' }],
        medications: [{ name: 'Metformin', date: '2023-06-01' }],
      },
    },
    {
      nss: '22222',
      firstName: 'John',
      lastName: 'Doe',
      address: 'Oran',
      phoneNumber: '0777333444',
      dob: '15/09/1990',
      emergencyContact: '0668333777',
      carePhysician: 'doctorY',
      consultations: [
        {
          date: '2024-02-10',
          doctorName: 'Dr. John',
          notes: 'Initial consultation',
          summary:
            'Initial consultation with Dr. John, prescriptions include Amoxicillin and Loratadine.',
          prescriptions: [
            { name: 'Amoxicillin', dose: '250mg', duration: '7 days' },
            { name: 'Loratadine', dose: '10mg', duration: '7 days' },
          ],
        },
      ],
    },
    {
      nss: '33333',
      firstName: 'Jane',
      lastName: 'Smith',
      address: 'Tlemcen',
      phoneNumber: '0798123456',
      dob: '02/11/1985',
      emergencyContact: '0669123456',
      carePhysician: 'doctorZ',
      consultations: [
        {
          date: '2023-12-20',
          doctorName: 'Dr. Sarah',
          notes: 'Diabetes management',
          summary:
            'Diabetes management consultation with Dr. Sarah, prescription includes Metformin.',
          prescriptions: [
            { name: 'Metformin', dose: '500mg', duration: '30 days' },
          ],
        },
      ],
    },
  ];

  nss: string = '';
  patient: any = null;
  showPrescriptionsList: boolean = false;
  selectedPrescription: any = null;
  selectedConsultation: any = null;
  showConsultationsList: boolean = false;
  showNursingCareList: boolean = false;
  selectedNursingCare: any = null;
  showMedicalHistory: boolean = false;

  searchPatient() {
    this.fetchDpi(this.nss);
    if (!this.patient) {
    }
  }
  onnssEntered(nss: string) {
    this.nss = nss;
    this.searchPatient();
  }

  fetchDpi(nss: any) {
    this.dpiService.getDpi(nss).subscribe({
      next: (outerData) => {
        this.authService.getNom(outerData.medecin_traitant).subscribe({
          next: (innerData) => {
            console.log('Since i was young', innerData);
            outerData.medecin_traitant = innerData;
            console.log('DPI:', outerData);
            this.patient = outerData;
          },
          error: (error) => console.error('Error fetching DPI:', error),
        });
        // Add more lines of code here
      },
      error: (error) => console.error('Error fetching DPI:', error),
    });
  }

  ngOnInit() {
    this.fetchOrdonnances();
  }
  fetchOrdonnances() {
    this.http.get(`${this.API_URL}list_ordonnances/`).subscribe({
      next: (data: any) => {
        console.log('Ordonnances fetched:', data); // Log the fetched data for debugging
        this.ordonnances = data; // Store the fetched ordonnances
      },
      error: (error) => {
        console.error('Error fetching ordonnances:', error); // Log errors if any
        this.error = 'Failed to load ordonnances.'; // Update the error message
      },
    });
  }
  selectPrescription(prescription: any) {
    if (prescription === null) {
      this.selectedPrescription = null;
      this.showPrescriptionsList = false;
    } else {
      // Si la prescription est un objet unique, le convertir en tableau
      this.selectedPrescription = {
        ...prescription, // Copier les données de la prescription
        medicaments: Array.isArray(prescription.medicaments)
          ? prescription.medicaments
          : [prescription], // S'assurer que medicaments est un tableau
      };
      this.showPrescriptionsList = false;
      console.log('Prescription sélectionnée:', this.selectedPrescription);
    }
  }

  // Méthode pour afficher la liste des prescriptions

  onViewConsultations() {
    this.showConsultationsList = true; // Show consultations list
  }
  selectConsultation(consultation: any) {
    console.log('Consultation sélectionnée:', consultation);

    if (!consultation) {
      // Si aucune consultation n'est sélectionnée, affiche la liste des consultations
      this.showConsultationsList = true;
      this.selectedConsultation = null;
      this.selectedPrescription = null;
    } else {
      // Si une consultation est sélectionnée, masque la liste et affiche les détails
      this.selectedConsultation = consultation;
      this.showConsultationsList = false;
      this.selectedPrescription = null;
    }
  }
  backToConsultationList() {
    this.selectedConsultation = null;
    this.showConsultationsList = true;
    this.showPrescriptionsList = true;
    this.selectedPrescription = null;
  }

  backToPatientInfoConsultation() {
    this.showConsultationsList = false;
    this.selectedConsultation = null;
    this.selectedPrescription = null;
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  calculateAge(dob: string): number {
    const [day, month, year] = dob.split('/').map((num) => parseInt(num, 10));
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

  onViewPrescriptions() {
    this.showPrescriptionsList = true;
  }

  onSelectPrescription(prescription: any) {
    this.selectedPrescription = prescription;
    this.showPrescriptionsList = false; // Hide the list of prescriptions when one is selected
  }
  handleBackToList() {
    this.selectedPrescription = null;
    this.showPrescriptionsList = true;
  }

  backToPatientInfo() {
    this.showPrescriptionsList = false;
    this.selectedPrescription = null;
  }
}
