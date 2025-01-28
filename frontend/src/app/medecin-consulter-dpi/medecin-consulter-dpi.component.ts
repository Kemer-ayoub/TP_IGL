import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import {MedecinAddNewConsultationComponent } from '../medecin-add-new-consultation/medecin-add-new-consultation.component'
import { MedicalHistoryComponent } from '../medical-history/medical-history.component';
import {MedecinExamRequestComponent} from '../medecin-exam-request/medecin-exam-request.component'
import { MedecinReportRequestComponent } from '../medecin-report-request/medecin-report-request.component';
import { ButtonRadiologueComponent } from "../button-radiologue/button-radiologue.component";
import { ReportListRadiologueComponent } from "../report-list-radiologue/report-list-radiologue.component";
import { ReportDetailRadiologueComponent } from "../report-detail-radiologue/report-detail-radiologue.component";
import { AddReportRadiologueComponent } from "../add-report-radiologue/add-report-radiologue.component";
import { Component,HostListener, inject, OnInit  } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DpiService } from '../dpi.service';
import { PatientInfoComponent } from '../patient-info/patient-info.component';
import { MedHistoryService } from '../medHistory.service';


@Component({
  selector: 'app-medecin-consulter-dpi',
  imports: [FormsModule,MedecinAddNewConsultationComponent,MedecinReportRequestComponent, MedecinExamRequestComponent, MedicalHistoryComponent, CommonModule, HeaderComponent, SearchBarComponent, PatientInfoComponent, ReactiveFormsModule],
  templateUrl: './medecin-consulter-dpi.component.html',
  styleUrl: './medecin-consulter-dpi.component.css'
})

export class MedecinConsulterDpiComponent {

  Typeofrecord: string = '';
  Nameofrecord: string = '';
  Dateofrecord: string = '';
  Dosage: number | null = null; // Initialize as null if optional

  
  

  authService = inject(AuthService);
  dpiService = inject(DpiService);
  medHistoryService = inject(MedHistoryService);
  user?: any;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly API_URL = 'http://127.0.0.1:8000/api/';
  private readonly REFRESH_URL = `${this.API_URL}token/refresh/`;
  private DPI_URL!: string;
  private http = inject(HttpClient);
  error: string | null = null;
  dpi: any = null;
  theid: any = null;
  data: any = null;

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
          summary: 'Routine check-up with Dr. Amina, prescriptions include Paracetamol and Ibuprofen.',
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
        surgeries: [
          { name: 'Appendectomy', date: '2015-07-20' },
        ],
        allergies: [
          { name: 'Penicillin', date: '2012-08-15' },
        ],
        medications: [
          { name: 'Metformin', date: '2023-06-01' },
        ],
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
          summary: 'Initial consultation with Dr. John, prescriptions include Amoxicillin and Loratadine.',
          prescriptions: [
            { name: 'Amoxicillin', dose: '250mg', duration: '7 days' },
            { name: 'Loratadine', dose: '10mg', duration: '7 days' }
          ]
        }
      ]
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
          summary: 'Diabetes management consultation with Dr. Sarah, prescription includes Metformin.',
          prescriptions: [
            { name: 'Metformin', dose: '500mg', duration: '30 days' }
          ]
        }
      ]
    }
  ];

  nss: string = '';
  patient: any = null;
  errorMessage: string = '';
  showPrescriptionsList: boolean = false;
  selectedPrescription: any = null;
  selectedConsultation: any = null;
  showAddConsultationsList: boolean = false;
  showNursingCareList: boolean = false;
  selectedNursingCare: any = null;
  showMedicalHistory: boolean = false;
  showExamRequest: boolean = false ;
  showReportRequest: boolean = false ;
  

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
            outerData.medecin_traitant = innerData;
            this.patient = outerData
          },
          error: (error) => console.error('Error fetching DPI:', error)
        })
        // Add more lines of code here
    },
      error: (error) => console.error('Error fetching DPI:', error)
    });
  }


  addMedicalRecord() {

    if (!this.Typeofrecord || !this.Nameofrecord || !this.Dateofrecord) {
      return; // If any field is empty, don't proceed
    }
    this.data = {
      "type_record": this.Typeofrecord,
      "name_record": this.Nameofrecord,
      "antec_date": this.Dateofrecord,
      "dosage": this.Dosage,
      "dpi": this.patient.id
    }

      console.log("that's where i follow", this.data)
      // Handle the form submission here
      this.medHistoryService.createAntecedants(this.data).subscribe({
        next: (response) => {
          console.log("the badi",response)
        },
        error: (error) => console.error('Error fetching DPI:', error)
      })
      
      // You can emit these values to a parent component or send to a service
      // this.medicalRecordAdded.emit(this.medicalForm.value);
      
      // Reset the form after successful submission
  }

  selectPrescription(prescription: any) {
    if (prescription === null) {
      this.selectedPrescription = null;
      this.showPrescriptionsList = false;
    } else {
      // Si la prescription est un objet unique, le convertir en tableau
      this.selectedPrescription = {
        ...prescription,  // Copier les données de la prescription
        medicaments: Array.isArray(prescription.medicaments) ? prescription.medicaments : [prescription]  // S'assurer que medicaments est un tableau
      };
      this.showPrescriptionsList = false;
      console.log('Prescription sélectionnée:', this.selectedPrescription);
    }
  }

  // Méthode pour afficher la liste des prescriptions

  onViewAddConsultations() {
    this.showAddConsultationsList = true;  // Show consultations list
  }
  selectConsultation(consultation: any) {
    console.log('Consultation sélectionnée:', consultation);

    if (!consultation) {
      // Si aucune consultation n'est sélectionnée, affiche la liste des consultations
      this.showAddConsultationsList = true;
      this.selectedConsultation = null;
      this.selectedPrescription = null;
    } else {
      // Si une consultation est sélectionnée, masque la liste et affiche les détails
      this.selectedConsultation = consultation;
      this.showAddConsultationsList = false;
      this.selectedPrescription = null;
    }
  }
  backToConsultationList() {
    this.selectedConsultation = null;
    this.showAddConsultationsList = true;
    this.showPrescriptionsList = true;
    this.selectedPrescription = null;
  }

  backToPatientInfoConsultation() {
    this.showAddConsultationsList = false;
    this.showMedicalHistory = false;
    this.selectedConsultation = null;
    this.selectedPrescription = null;
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
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



 

  onViewPrescriptions() {
    this.showPrescriptionsList = true;
  }

  onSelectPrescription(prescription: any) {
    this.selectedPrescription = prescription;
    this.showPrescriptionsList = false;  // Hide the list of prescriptions when one is selected
  }
  handleBackToList() {
    this.selectedPrescription = null;
    this.showPrescriptionsList = true;

  }

  backToPatientInfo() {
    this.showPrescriptionsList = false;
    this.selectedPrescription = null;
  }
  // Méthode pour afficher ou masquer l'historique médical
  toggleMedicalHistory() {
    this.medHistoryService.getAntecedants(this.patient.id).subscribe({
      next: (response) => {
        console.log("the reda response:", response)
        // Define a mapping for `type_record` values to the desired categories
        const typeMapping: { [key: string]: string } = {
          "allergie": "allergies",
          "vaccination": "vaccination",
          "medication": "medications",
          "personal medical": "chronicIllnesses" // Map 'personal medical' to 'chronicIllnesses'
        };

        const medicalHistory = response.reduce((acc: any, item: any) => {
          const type = typeMapping[item.type_record];
          if (!type) return acc; // Skip if the type is not mapped
          if (!acc[type]) {
            acc[type] = [];
          }
          acc[type].push({ name: item.name_record, date: item.antec_date });
          return acc;
        }, {});

        const formattedHistory = {
          medicalHistory: {
            chronicIllnesses: medicalHistory.chronicIllnesses || [],
            surgeries: medicalHistory.vaccination || [],
            allergies: medicalHistory.allergies || [],
            medications: medicalHistory.medications || [],
          },
        };
        console.log("formatted baby",formattedHistory);
        this.patient = { ...this.patient, ...formattedHistory };
        console.log("the patient",this.patient)
        if (this.patient?.medicalHistory) {
          this.showMedicalHistory = !this.showMedicalHistory;
        } else {
          this.errorMessage = 'Medical history not available for this patient!';
        }
      },
      error: (error) => console.error('Error fetching DPI:', error)
    })
  }

  toggleReportRequest(){
    console.log('toggleReportRequest');
    this.showReportRequest = !this.showReportRequest ;
  }
  toggleExamRequest(){
    console.log('toggleExamRequest');
    this.showExamRequest = !this.showExamRequest ;
  }
  backToPatientInfoMedicalHistory() {
    this.showMedicalHistory = !this.showMedicalHistory;
  }

}
