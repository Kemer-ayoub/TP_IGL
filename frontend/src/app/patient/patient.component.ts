import { Component,HostListener, inject, OnInit  } from '@angular/core';
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
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MedHistoryService } from '../medHistory.service';
import { ConsultationService } from '../consultation.service';
import { ExamDetailPatientComponent } from '../exam-detail-patient/exam-detail-patient.component';
import { ExamsListPatientComponent } from '../exams-list-patient/exams-list-patient.component';
import { OrdonnanceService } from '../ordonnance.service';
import { SoinService } from '../soin.service';
import { BilanbiologiqueService } from '../bilanbiologique.service';

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/ 
@Component({
  selector: 'app-patient',
  imports: [FormsModule,ExamDetailPatientComponent,ExamsListPatientComponent, MedicalHistoryComponent,NursingComponent, ButtonsPatientComponent,RouterLink, ConsultationDetailComponent, CommonModule, ConsultationListComponent, HeaderComponent, SearchBarComponent, PatientInfoComponent, PrescriptionsDetailComponent, PrescriptionsListComponent,],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  authService = inject(AuthService);
  medHistoryService = inject(MedHistoryService);
  consultationService = inject(ConsultationService);
  ordonnanceService = inject(OrdonnanceService);
  bilanbiologiqueService = inject(BilanbiologiqueService);
  
  soinService = inject(SoinService);
  user?: any;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly API_URL = 'http://127.0.0.1:8000/api/';
  private readonly REFRESH_URL = `${this.API_URL}token/refresh/`;
  private DPI_URL!: string;
  private http = inject(HttpClient);
  error: string | null = null;
  dpi: any = null;
  ssn: string = '';
  patient: any = null;
  errorMessage: string = '';
  showPrescriptionsList: boolean = false;
  selectedPrescription: any = null;
  selectedConsultation: any = null;
  showConsultationsList: boolean = false;
  showNursingCareList: boolean = false;
  selectedNursingCare: any = null;
  showMedicalHistory: boolean = false;
  selectedNursingCareIndex: number | null = null;
  nss: string = '';
  selectedCare: any = null;
  showCaresList: boolean = false;
  showNursing: boolean = false;


  constructor() {
    this.authService.getCurrentAuthUser().subscribe((r) => {
      console.log(r);
      this.user = r;
      this.DPI_URL = `${this.API_URL}dpi/${this.user.id}`;
      this.fetchDpi();
    });
  }
  private fetchDpi() {
    try {
      const tokenData = JSON.parse(localStorage.getItem(this.JWT_TOKEN) || '{}');
      const accessToken = tokenData.access;
      console.log('Access token:', accessToken);
  
      if (!accessToken) {
        throw new Error('Access token not found.');
      }
  
      const makeRequest = (token: string) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
  
        return this.http.get(this.DPI_URL, { headers });
      };
  
      makeRequest(accessToken).pipe(
        catchError((error) => {
          if (error.status === 401) {
            // Get refresh token
            const refreshToken = tokenData.refresh;
            
            if (!refreshToken) {
              return throwError(() => new Error('Refresh token not found'));
            }
  
            // Call refresh token endpoint
            return this.http.post<{ access: string, refresh: string }>(
              this.REFRESH_URL, 
              { refresh: refreshToken }
            ).pipe(
              switchMap(newTokens => {
                // Save new tokens
                localStorage.setItem(this.JWT_TOKEN, JSON.stringify(newTokens));
                
                // Retry the original request with new token
                return makeRequest(newTokens.access);
              }),
              catchError(refreshError => {
                // If refresh fails, clear tokens and throw error
                localStorage.removeItem(this.JWT_TOKEN);
                return throwError(() => new Error('Token refresh failed'));
              })
            );
          }
          return throwError(() => new Error('Failed to fetch DPI information'));
        })
      ).subscribe({
        next: (response) => {
          this.dpi = response;
          this.ssn = this.dpi.ssn;
          console.log('DPI:', this.dpi);
          this.authService.getNom(this.dpi.medecin_traitant).subscribe({
            next: (innerData) => {
              this.dpi.medecin_traitant = innerData;
              this.patient = this.dpi;

            },
            error: (error) => console.error('Error fetching DPI:', error)
          })
        },
        error: (error) => {
          this.error = error.message;
          if (error.message === 'Token refresh failed') {
            // Handle refresh failure (e.g., redirect to login)
            // this.router.navigate(['/login']);
          }
        }
      });
  
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'An unknown error occurred';
    }
  }

  //----------------------------------------------------
  ngOnInit(): void {
    // Initialisation lors du chargement du composant
    this.updateHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    // Mettre à jour la hauteur lors du redimensionnement
    this.updateHeight();
  }

  private updateHeight(): void {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  patients = [
    {
      ssn: '111',
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
        
        
        {
          date: '2024-02-10',
          doctorName: 'Dr. John',
          notes: 'Initial consultation',
          summary: 'Initial consultation with Dr. John, prescriptions include Amoxicillin and Loratadine.',
          prescriptions: [
            { name: 'Amoxicillin', dose: '250mg', duration: '7 days' },
            { name: 'Loratadine', dose: '10mg', duration: '7 days' }
          ]
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
          { name: 'Hypertension', date: '2020-03-10' },
        ],
        surgeries: [
          { name: 'Appendectomy', date: '2015-07-20' },
          { name: 'Appendectomy', date: '2015-07-20' },
        ],
        allergies: [
          { name: 'Penicillin', date: '2012-08-15' },
          { name: 'Penicillin', date: '2012-08-15' },
        ],
        medications: [
          { name: 'Metformin', date: '2023-06-01' },
          { name: 'Metformin', date: '2023-06-01' },
        ],
      },


    },
    {
      ssn: '22222',
      firstName: 'John',
      lastName: 'Doe',
      address: 'Oran',
      phoneNumber: '0777333444',
      dob: '15/09/1990',
      emergencyContact: '0668333777',
      carePhysician: 'doctorY',
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
      ssn: '33333',
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

   getDPI() {
      const tokenData = JSON.parse(localStorage.getItem(this.JWT_TOKEN) || '{}'); // Parse stored token JSON
      const accessToken = tokenData.access; // Extract the access token
      
    
      if (!accessToken) {
        throw new Error('Access token not found.');
      }
    
      const headers = new HttpHeaders({
        Authorization: `Bearer ${accessToken}`,
      });
    
      return this.http.get(this.DPI_URL, { headers });
    }

  searchPatient() {
    this.errorMessage = '';
    this.patient = this.patients.find(patient => patient.ssn === this.ssn);
    if (!this.patient) {
      this.errorMessage = 'Patient not found!';
    }
  }
  onSSNEntered(ssn: string) { // this is executed when the search
    this.ssn = ssn;
    this.searchPatient();
  }

  // Méthode pour afficher la liste des prescriptions

  onViewConsultations() {
    this.consultationService.getAllConsultation(this.dpi.id).subscribe({
      next: (response) => {
        console.log("the reda response:", response)
        const formattedHistory: any = {
          consultations: []
        };
        
        // Format each consultation into an object with consultation ID as key
        response.forEach((consultation: any) => {
          formattedHistory.consultations[consultation.id] = consultation;
          this.authService.getNom(consultation.medecin).subscribe({
            next: (innerresponse: any) => {
              formattedHistory.consultations[consultation.id].medecin = innerresponse;
              const formattedPrescription: any = {
                prescriptions: []
              };
              this.ordonnanceService.getAllOrdonnance(consultation.id).subscribe({
                next: (outerresponse: any) => {
                  console.log("1",formattedHistory.consultations[consultation.id] )
                  formattedPrescription.prescriptions = outerresponse
                  formattedHistory.consultations[consultation.id] = {
                    ...formattedHistory.consultations[consultation.id],
                    ...formattedPrescription
                  };           
                  console.log("2",formattedHistory.consultations[consultation.id] )
    
                }
              })
            }
            
          })
        });
        this.patient = { ...this.patient, ...formattedHistory };
        console.log("This is the end hold your breath and count to ten",this.patient)
        if (this.patient?.consultations) {
          this.showConsultationsList = true;  // Show consultations list
        } else {
          this.errorMessage = 'Consultations not available for this patient!';
        }
      },
      error: (error) => console.error('Error fetching DPI:', error)
    })
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

  // Afficher la liste des soins infirmiers
  onViewNursingCareList() {
    this.soinService.getAllSoin(this.dpi.id).subscribe({
      next: (response) => {
        console.log("the reda response:", response)
        const formattedHistory: any = {
          nursingCare: []
        };
        
        // Format each consultation into an object with consultation ID as key
        response.forEach((consultation: any) => {
          formattedHistory.nursingCare[consultation.id] = consultation;
          this.authService.getNom(consultation.infirmier).subscribe({
            next: (innerresponse: any) => {
              formattedHistory.nursingCare[consultation.id].infirmier = innerresponse;
              /*const formattedPrescription: any = {
                prescriptions: []
              };
              this.ordonnanceService.getAllOrdonnance(consultation.id).subscribe({
                next: (outerresponse: any) => {
                  console.log("1",formattedHistory.consultations[consultation.id] )
                  formattedPrescription.prescriptions = outerresponse
                  formattedHistory.consultations[consultation.id] = {
                    ...formattedHistory.consultations[consultation.id],
                    ...formattedPrescription
                  };           
                  console.log("2",formattedHistory.consultations[consultation.id] )
    
                }
              })*/
            }
            
          })
        });
        this.patient = { ...this.patient, ...formattedHistory };
        console.log("This is the end hold your breath and count to ten",this.patient)
        if (this.patient?.nursingCare) {
          this.showNursingCareList = true; // Montre la liste des soins infirmiers
          this.selectedNursingCare = null; // Réinitialise le soin sélectionné        } else {
          this.errorMessage = 'Consultations not available for this patient!';
        }
      },
      error: (error) => console.error('Error fetching DPI:', error)
    })
    
  }

  // Sélectionner un soin infirmier
  selectNursingCare(event: { nursingCare: any, index: number }) {
    const { nursingCare, index } = event;
    console.log('Soin infirmier sélectionné:', nursingCare, 'Index:', index);
  
    if (!nursingCare) {
      // Si aucun soin n'est sélectionné, affiche la liste des soins infirmiers
      this.showNursingCareList = true;
      this.selectedNursingCare = null;
    } else {
      // Si un soin est sélectionné, masque la liste et affiche les détails
      this.selectedNursingCare = nursingCare;
      this.selectedNursingCareIndex = index;  // Stocke l'index du soin sélectionné
      this.showNursingCareList = false;
    }
  }
  

  // Retour à la liste des soins infirmiers
  backToNursingCareList() {
    this.selectedNursingCare = null; // Réinitialise le soin sélectionné
    this.showNursingCareList = true; // Réaffiche la liste des soins
  }

  // Retour aux informations du patient depuis les soins infirmiers
  backToPatientInfoNursing() {
    this.showNursingCareList = false; // Cache la liste des soins
    this.selectedNursingCare = null; // Réinitialise le soin sélectionné
  }



  // Méthode pour afficher ou masquer l'historique médical
  toggleMedicalHistory() {
    this.medHistoryService.getAntecedants(this.dpi.id).subscribe({
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

  backToPatientInfoMedicalHistory() {
    this.showMedicalHistory = false;
  }
  /*getAllBilanBiologique(){
  console.log("the view get called hhhhhhhhhhhhhhhhhh",this.dpi.id)
  this.bilanbiologiqueService.getAllBilanBiologique(this.dpi.id).subscribe({
    next: (response) => {
      console.log("ah i love it and i hate it at the same time",response);
      this.patient.previousCares = response;
      this.showCaresList = true; 
      console.log(this.showCaresList,"hahahahahhaha",this.patient) 
    },
    error: () => console.error('Error fetching DPI:')
  })
}*/

normalizeCares(cares: any): any[] {
  // If cares is an object, wrap it in an array; if already an array, return it as is
  return Array.isArray(cares) ? cares : cares ? [cares] : [];
}

async getAllBilanBiologique(): Promise<void> {
  console.log("The view gets called hhhhhhhhhhhhhhhhhh", this.dpi.id);
  try {
    const response = await this.bilanbiologiqueService.getAllBilanBiologique(this.dpi.id).toPromise();
    console.log("Ah, I love it and I hate it at the same time", response);
    this.patient.previousCares = response;
    this.showCaresList = true; 
    console.log(this.showCaresList, "hahahahahhaha", this.patient);
  } catch (error) {
    console.error('Error fetching DPI:', error);
  }
}

async onViewCares() {
  console.log("The view gets called");
  await this.getAllBilanBiologique();
  console.log(this.showCaresList, "hahahahahhaha", this.patient.previousCares);
}

selectConsultation1(care: any) {
  if (!care) {
    // Si aucune consultation n'est sélectionnée, affiche la liste des consultations
    this.showCaresList = true;
    this.selectedCare = null;
  } else {
    // Si une consultation est sélectionnée, masque la liste et affiche les détails
    this.selectedCare = care;
    this.showCaresList = false;
  }
}
backToPatientInfoConsultation1() {
  this.showCaresList = false;
  this.selectedCare = null;
}
backToConsultationList1() {
  this.selectedCare = null;
  this.showCaresList = true;
}
 
}
