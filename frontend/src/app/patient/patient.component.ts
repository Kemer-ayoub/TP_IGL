import { Component, HostListener, inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-patient',
  imports: [FormsModule,ExamDetailPatientComponent,ExamsListPatientComponent, MedicalHistoryComponent,NursingComponent, ButtonsPatientComponent,RouterLink, ConsultationDetailComponent, CommonModule, ConsultationListComponent, HeaderComponent, SearchBarComponent, PatientInfoComponent, PrescriptionsDetailComponent, PrescriptionsListComponent,],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  authService = inject(AuthService);
  medHistoryService = inject(MedHistoryService);
  consultationService = inject(ConsultationService);
  ordonnanceService = inject(OrdonnanceService);
  bilanbiologiqueService = inject(BilanbiologiqueService);
  
  soinService = inject(SoinService);
  user?: any;
  dpi: any = null;
  patient: any = null;
  error: string | null = null;
  errorMessage: string = '';
  ssn: string = '';

  // API endpoints
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly API_URL = 'http://127.0.0.1:8000/api/';
  private readonly REFRESH_URL = `${this.API_URL}token/refresh/`;
  private DPI_URL!: string;

  // UI State
  showPrescriptionsList = false;
  selectedPrescription: any = null;
  selectedConsultation: any = null;
  showConsultationsList = false;
  showNursingCareList = false;
  selectedNursingCare: any = null;
  showMedicalHistory = false;
  selectedNursingCareIndex: number | null = null;
  nss: string = '';
  selectedCare: any = null;
  showCaresList: boolean = false;
  showNursing: boolean = false;

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
        chronicIllnesses: [{ name: 'Diabetes', date: '2018-05-01' }],
        surgeries: [{ name: 'Appendectomy', date: '2015-07-20' }],
        allergies: [{ name: 'Penicillin', date: '2012-08-15' }],
        medications: [{ name: 'Metformin', date: '2023-06-01' }],
      },
    },
  ];

  constructor() {
    this.authService.getCurrentAuthUser().subscribe((user) => {
      this.user = user;
      this.DPI_URL = `${this.API_URL}dpi/${this.user.id}`;
      this.fetchDpi();
    });
  }

  ngOnInit(): void {
    this.updateHeight();
  }

  private fetchDpi() {
    try {
      const tokenData = JSON.parse(
        localStorage.getItem(this.JWT_TOKEN) || '{}',
      );
      const accessToken = tokenData.access;

      if (!accessToken) {
        throw new Error('Access token not found.');
      }

      const headers = new HttpHeaders({
        Authorization: `Bearer ${accessToken}`,
      });

      this.http
        .get(this.DPI_URL, { headers })
        .pipe(
          catchError((error) => {
            if (error.status === 401) {
              const refreshToken = tokenData.refresh;
              if (!refreshToken) {
                return throwError(() => new Error('Refresh token not found'));
              }

              return this.http
                .post<{
                  access: string;
                }>(this.REFRESH_URL, { refresh: refreshToken })
                .pipe(
                  switchMap((newTokens) => {
                    localStorage.setItem(
                      this.JWT_TOKEN,
                      JSON.stringify(newTokens),
                    );
                    return this.http.get(this.DPI_URL, {
                      headers: new HttpHeaders({
                        Authorization: `Bearer ${newTokens.access}`,
                      }),
                    });
                  }),
                  catchError(() => {
                    localStorage.removeItem(this.JWT_TOKEN);
                    return throwError(() => new Error('Token refresh failed'));
                  }),
                );
            }
            return throwError(
              () => new Error('Failed to fetch DPI information'),
            );
          }),
        )
        .subscribe({
          next: (response) => {
            this.dpi = response;
            this.ssn = this.dpi.ssn;
            this.authService.getNom(this.dpi.medecin_traitant).subscribe({
              next: (name) => (this.dpi.medecin_traitant = name),
              error: (err) => console.error('Error fetching doctor name:', err),
            });
          },
          error: (err) => (this.error = err.message),
        });
    } catch (err) {
      this.error =
        err instanceof Error ? err.message : 'An unknown error occurred';
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateHeight();
  }

  private updateHeight(): void {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  searchPatient() {
    this.errorMessage = '';
    this.patient = this.patients.find((p) => p.ssn === this.ssn);
    if (!this.patient) {
      this.errorMessage = 'Patient not found!';
    }
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

          this.showMedicalHistory = !this.showMedicalHistory;
        },
        error: (err) => console.error('Error fetching medical history:', err),
      });
    }
  }

  calculateAge(dob: string): number {
    const [day, month, year] = dob.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
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
